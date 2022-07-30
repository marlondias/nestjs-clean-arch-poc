import ValueObject from '../Contracts/ValueObject';

export default class PersonName implements ValueObject {
  private firstName: string;
  private lastName: string;
  private fullName: string;

  constructor(firstName: string, lastName?: string) {
    const maxNameLength = 40;
    firstName = firstName.trim();
    lastName = lastName ? lastName.trim() : '';
    if (firstName.length == 0) {
      throw new Error('First name cannot be empty.');
    }
    if (firstName.length > maxNameLength) {
      throw new Error(
        `First name cannot be longer than ${maxNameLength} characters.`,
      );
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = lastName ? `${firstName} ${lastName}` : firstName;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getFullName(): string {
    return this.fullName;
  }

  toMap(): Map<string, any> {
    const map = new Map<string, string>();
    map.set('firstName', this.firstName);
    map.set('lastName', this.lastName);
    map.set('fullName', this.fullName);
    return map;
  }
}
