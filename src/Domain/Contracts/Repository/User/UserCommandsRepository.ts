import User from 'src/Domain/Entities/User';

export default interface UserCommandsRepository {
  insert(user: User): void;
  update(user: User): void;
  deleteById(id: string | number): void;
}
