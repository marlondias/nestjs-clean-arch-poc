import UserCommandsRepository from 'src/Domain/Contracts/Repository/User/UserCommandsRepository';
import UserQueriesRepository from 'src/Domain/Contracts/Repository/User/UserQueriesRepository';
import StringHashingService from 'src/Domain/Contracts/Services/StringHashingService';
import User from 'src/Domain/Entities/User';
import InputBoundary from './InputBoundary';
import OutputBoundary from './OutputBoundary';

export default class UpdateUserUseCase {
  private userCommandsRepository: UserCommandsRepository;
  private userQueriesRepository: UserQueriesRepository;
  private stringHashingService: StringHashingService;

  public UpdateUserUseCase(
    userCommandsRepository: UserCommandsRepository,
    userQueriesRepository: UserQueriesRepository,
    stringHashingService: StringHashingService,
  ) {
    this.userCommandsRepository = userCommandsRepository;
    this.userQueriesRepository = userQueriesRepository;
    this.stringHashingService = stringHashingService;
  }

  async handle(input: InputBoundary): Promise<OutputBoundary> {
    const user = await this.userQueriesRepository.findById(input.getUserId());
    this.replaceUserAttributes(input, user);
    this.userCommandsRepository.update(user);
    return new OutputBoundary(`Usuário ${input.getUserId()} foi atualizado!`);
  }

  private replaceUserAttributes(input: InputBoundary, user: User): void {
    if (input.getEmailAddress() != null) {
      user.setEmailAddress(input.getEmailAddress());
    }

    if (input.getPassword() != null) {
      user.setHashedPasswordFromPlainText(
        this.stringHashingService,
        input.getPassword(),
      );
    }

    const newFirstName = input.getFirstName();
    const newLastName = input.getLastName();
    if (newFirstName != null || newLastName != null) {
      const oldName = user.getName();
      user.setPersonName(
        newFirstName != null ? newFirstName : oldName.getFirstName(),
        newLastName != null ? newLastName : oldName.getLastName(),
      );
    }
  }
}
