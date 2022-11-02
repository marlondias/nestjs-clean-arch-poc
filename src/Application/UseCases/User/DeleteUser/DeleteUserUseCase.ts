import UserCommandsRepository from 'src/Domain/Contracts/Repository/User/UserCommandsRepository';
import InputBoundary from './InputBoundary';
import OutputBoundary from './OutputBoundary';

export default class DeleteUserUseCase {
  private userCommandsRepository: UserCommandsRepository;

  constructor(userCommandsRepository: UserCommandsRepository) {
    this.userCommandsRepository = userCommandsRepository;
  }

  handle(input: InputBoundary): OutputBoundary {
    this.userCommandsRepository.deleteById(input.getUserId());
    return new OutputBoundary(`Usuário ${input.getUserId()} foi deletado!`);
  }
}
