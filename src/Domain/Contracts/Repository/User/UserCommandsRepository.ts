import User from 'src/Domain/Entities/User';
import EntityNotFoundException from 'src/Domain/Exceptions/EntityNotFoundException';

export default interface UserCommandsRepository {
  /**
   * @throws Error
   */
  insert(user: User): Promise<void>;

  /**
   * @throws Error
   */
  update(user: User): Promise<void>;

  /**
   * @throws Error
   */
  deleteById(id: number): Promise<void>;
}
