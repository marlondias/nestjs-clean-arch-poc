import User from 'src/Domain/Entities/User';
import EmailAddress from 'src/Domain/ValueObjects/EmailAddress';

export default interface UserQueriesRepository {
  /**
   * @throws EntityNotFoundException
   */
  findById(id: number): Promise<User>;

  /**
   * @throws EntityNotFoundException
   */
  findByEmail(emailAddress: EmailAddress): Promise<User>;

  /**
   * @throws Error
   */
  getAll(): Promise<User[]>;
}
