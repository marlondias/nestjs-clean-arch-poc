import UserQueriesRepository from 'src/Domain/Contracts/Repository/User/UserQueriesRepository';
import InputBoundary from './InputBoundary';
import OutputBoundary from './OutputBoundary';

export default class GetAllUsersUseCase {
  private userQueriesRepository: UserQueriesRepository;

  constructor(userQueriesRepository: UserQueriesRepository) {
    this.userQueriesRepository = userQueriesRepository;
  }

  async handle(input: InputBoundary): Promise<OutputBoundary> {
    const users = await this.userQueriesRepository.getAll();
    if (users.length == 0) {
      return new OutputBoundary('Nenhum usuário encontrado!');
    }
    const output = new OutputBoundary(`${users.length} usuários encontrados!`);
    for (const user of users) {
      output.addUser(user);
    }
    return output;
  }
}
