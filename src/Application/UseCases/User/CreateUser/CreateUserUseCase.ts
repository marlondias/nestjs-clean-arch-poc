import UseCaseInteractor from 'src/Application/Contracts/UseCaseInteractor';
import UserCommandsRepository from 'src/Domain/Contracts/Repository/User/UserCommandsRepository';
import UserQueriesRepository from 'src/Domain/Contracts/Repository/User/UserQueriesRepository';
import StringHashingService from 'src/Domain/Contracts/Services/StringHashingService';
import User from 'src/Domain/Entities/User';
import InputBoundary from './InputBoundary';
import OutputBoundary from './OutputBoundary';

export default class CreateUserUseCase implements UseCaseInteractor {
  private userCommandsRepository: UserCommandsRepository;
  private userQueriesRepository: UserQueriesRepository;
  private stringHashingService: StringHashingService;

  constructor(
    userCommandsRepository: UserCommandsRepository,
    userQueriesRepository: UserQueriesRepository,
    stringHashingService: StringHashingService,
  ) {
    this.userCommandsRepository = userCommandsRepository;
    this.userQueriesRepository = userQueriesRepository;
    this.stringHashingService = stringHashingService;
  }

  async handle(input: InputBoundary): Promise<OutputBoundary> {
    const user = new User()
      .setPersonName(input.getFirstName(), input.getLastName())
      .setEmailAddress(input.getEmailAddress())
      .setHashedPasswordFromPlainText(
        this.stringHashingService,
        input.getPassword(),
      );

    const isEmailInUse = user.isEmailAddressAlreadyInUse(
      this.userQueriesRepository,
      user.getEmail(),
    );
    if (isEmailInUse) {
      throw new Error('User with this email address already exists.');
    }

    await this.userCommandsRepository.insert(user);
    return new OutputBoundary('Usuário criado!');
  }
}
