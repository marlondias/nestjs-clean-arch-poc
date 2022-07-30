export default interface StringHashingService {
  getPasswordHash(password: string): string;

  checkPasswordHashMatches(password: string, hashedPassword: string): boolean;
}
