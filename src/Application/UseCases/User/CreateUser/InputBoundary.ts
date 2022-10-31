import UseCaseInputBoundary from 'src/Application/Contracts/UseCaseInputBoundary';

export default class InputBoundary implements UseCaseInputBoundary {
  private firstName: string;
  private lastName: string;
  private emailAddress: string;
  private password: string;

  constructor(
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.password = password;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmailAddress(): string {
    return this.emailAddress;
  }

  getPassword(): string {
    return this.password;
  }
}
