import UseCaseInputBoundary from 'src/Application/Contracts/UseCaseInputBoundary';

export default class InputBoundary implements UseCaseInputBoundary {
  private userId: number;
  private firstName: string | null;
  private lastName: string | null;
  private emailAddress: string | null;
  private password: string | null;

  constructor(userId: number, changedAttributes: Map<string, string>) {
    this.userId = userId;
    let someValidKeyWasPassed = false;

    if (changedAttributes.has('firstName')) {
      this.firstName = changedAttributes.get('firstName');
      someValidKeyWasPassed = true;
    }

    if (changedAttributes.has('lastName')) {
      this.lastName = changedAttributes.get('lastName');
      someValidKeyWasPassed = true;
    }

    if (changedAttributes.has('emailAddress')) {
      this.emailAddress = changedAttributes.get('emailAddress');
      someValidKeyWasPassed = true;
    }

    if (changedAttributes.has('password')) {
      this.password = changedAttributes.get('password');
      someValidKeyWasPassed = true;
    }

    if (!someValidKeyWasPassed) {
      throw new Error(
        'None of the attribute keys are relevant for updating a User.',
      );
    }
  }

  getUserId(): number {
    return this.userId;
  }

  getFirstName(): string | null {
    return this.firstName;
  }

  getLastName(): string | null {
    return this.lastName;
  }

  getEmailAddress(): string | null {
    return this.emailAddress;
  }

  getPassword(): string | null {
    return this.password;
  }
}
