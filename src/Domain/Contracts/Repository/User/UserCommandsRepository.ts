import User from 'src/Domain/Entities/User';

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
