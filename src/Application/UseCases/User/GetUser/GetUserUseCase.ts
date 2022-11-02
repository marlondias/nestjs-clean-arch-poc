import UserQueriesRepository from 'src/Domain/Contracts/Repository/User/UserQueriesRepository';
import InputBoundary from './InputBoundary';
import OutputBoundary from './OutputBoundary';

export default class GetUserUseCase {
  private userQueriesRepository: UserQueriesRepository;

  constructor(userQueriesRepository: UserQueriesRepository) {
    this.userQueriesRepository = userQueriesRepository;
  }

  async handle(input: InputBoundary): Promise<OutputBoundary> {
    const user = await this.userQueriesRepository.findById(input.getUserId());
    const output = new OutputBoundary('Usuário encontrado!');
    output.setUser(user);
    return output;
  }
}
