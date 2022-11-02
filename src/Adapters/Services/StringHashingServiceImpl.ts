import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import StringHashingService from 'src/Domain/Contracts/Services/StringHashingService';

@Injectable()
export default class StringHashingServiceImpl implements StringHashingService {
  getPasswordHash(password: string): string {
    const saltOrRounds = 10;
    return bcrypt.hashSync(password, saltOrRounds);
  }

  checkPasswordHashMatches(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
