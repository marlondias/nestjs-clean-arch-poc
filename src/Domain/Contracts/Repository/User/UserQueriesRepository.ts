import User from 'src/Domain/Entities/User';
import EmailAddress from 'src/Domain/ValueObjects/EmailAddress';

export default interface UserQueriesRepository {
  findById(id: string | number): User;
  findByEmail(emailAddress: EmailAddress): User;
  getAll(): Array<User>;
}
