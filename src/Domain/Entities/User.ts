import Entity from '../Contracts/Entity';
import UserQueriesRepository from '../Contracts/Repository/User/UserQueriesRepository';
import StringHashingService from '../Contracts/Services/StringHashingService';
import DomainException from '../Exceptions/DomainException';
import EmailAddress from '../ValueObjects/EmailAddress';
import PersonName from '../ValueObjects/PersonName';

export default class User extends Entity {
  protected name: PersonName;
  protected email: EmailAddress;
  protected hashedPassword: string;
  protected emailVerifiedAt?: Date;
  protected createdAt?: Date;
  protected updatedAt?: Date;

  constructor() {
    super();
  }

  toMap(): Map<string, any> {
    const map = new Map<string, any>();
    map.set('id', this.id);
    map.set('name', this.name ? this.name.toMap() : null);
    map.set('email', this.email ? this.email.toMap() : null);
    map.set('hashedPassword', this.hashedPassword);
    map.set(
      'emailVerifiedAt',
      this.emailVerifiedAt ? this.emailVerifiedAt.toISOString() : null,
    );
    map.set('createdAt', this.createdAt ? this.createdAt.toISOString() : null);
    map.set('updatedAt', this.updatedAt ? this.updatedAt.toISOString() : null);
    return map;
  }

  getName(): PersonName {
    return this.name;
  }

  getEmail(): EmailAddress {
    return this.email;
  }

  getHashedPassword(): string {
    return this.hashedPassword;
  }

  getEmailVerifiedAt(): Date {
    return this.emailVerifiedAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setPersonName(firstName: string, lastName: string): User {
    this.name = new PersonName(
      firstName,
      lastName.length > 0 ? lastName : null,
    );
    return this;
  }

  setEmailAddress(emailAddress: string): User {
    this.email = new EmailAddress(emailAddress);
    return this;
  }

  setHashedPassword(hashedPassword: string): User {
    this.hashedPassword = hashedPassword;
    return this;
  }

  setHashedPasswordFromPlainText(
    stringHashingService: StringHashingService,
    password: string,
  ): User {
    this.validatePasswordContent(password);
    this.hashedPassword = stringHashingService.getPasswordHash(password);
    return this;
  }

  setEmailVerifiedAt(dateTime: Date): User {
    this.emailVerifiedAt = dateTime;
    return this;
  }

  setCreatedAt(dateTime: Date): User {
    this.createdAt = dateTime;
    return this;
  }

  setUpdatedAt(dateTime: Date): User {
    this.updatedAt = dateTime;
    return this;
  }

  validatePasswordContent(password: string) {
    if (password.length < 5 || password.length > 30) {
      throw new DomainException(
        'A senha de usuário deve conter entre 5 e 30 caracteres.',
      );
    }
    if (password.replace(/\s/g, '').length != password.length) {
      throw new DomainException('A senha de usuário não pode conter espaços.');
    }

    const regexNumber = new RegExp('(.*\\d.*)');
    if (!regexNumber.test(password)) {
      throw new DomainException('A senha de usuário deve conter algum número.');
    }

    const regexLowerCaseLetter = new RegExp('(.*[a-z].*)');
    if (!regexLowerCaseLetter.test(password)) {
      throw new DomainException(
        'A senha de usuário deve conter alguma letra minúscula.',
      );
    }

    const regexUpperCaseLetter = new RegExp('(.*[A-Z].*)');
    if (!regexUpperCaseLetter.test(password)) {
      throw new DomainException(
        'A senha de usuário deve conter alguma letra maiúscula.',
      );
    }

    const regexValidSymbol = new RegExp('(.*[!@#$%&*+\\-_=~^?].*)');
    if (!regexValidSymbol.test(password)) {
      throw new DomainException(
        'A senha de usuário deve conter algum símbolo válido (! @ # $ % & * + - _ = ~ ^ ?).',
      );
    }

    const regexAllValidChars = new RegExp('.*([!@#$%&*+\\-_=~^?\\w]).*');
    if (password.replace(regexAllValidChars, '').length > 0) {
      throw new DomainException(
        'A senha de usuário só pode conter símbolos válidos (! @ # $ % & * + - _ = ~ ^ ?) e nenhum outro.',
      );
    }
  }

  isPasswordCorrect(
    stringHashingService: StringHashingService,
    password: string,
  ): boolean {
    if (this.hashedPassword == null) {
      throw new Error('Não há como comparar a senha com uma hash indefinida.');
    }
    return stringHashingService.checkPasswordHashMatches(
      password,
      this.hashedPassword,
    );
  }

  isEmailAddressAlreadyInUse(
    repository: UserQueriesRepository,
    emailAddress: EmailAddress,
  ): boolean {
    const user = repository.findByEmail(emailAddress);
    return user != null;
  }
}
