import * as bcrypt from 'bcrypt';
import StringHashingService from 'src/Domain/Contracts/Services/StringHashingService';

export default class StringHashingServiceImpl implements StringHashingService {
  getPasswordHash(password: string): string {
    const saltOrRounds = 10;
    return bcrypt.hashSync(password, saltOrRounds);
  }

  checkPasswordHashMatches(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
