import ValueObject from '../Contracts/ValueObject';

export default class EmailAddress implements ValueObject {
  private fullAddress: string;
  private localPart: string;
  private domainPart: string;

  constructor(emailAddress: string) {
    emailAddress = emailAddress.trim();
    const regexValidEmail = RegExp(
      "^([^.][!#$%&'*+\\-/=?^_`{|}~.\\w\\d]+[^.])@([\\-.\\w]+)$",
    );
    if (!regexValidEmail.test(emailAddress)) {
      throw new Error('E-mail address is not valid.');
    }
    const matches = regexValidEmail.exec(emailAddress);
    this.localPart = matches[1];
    this.domainPart = matches[2];
    this.fullAddress = emailAddress;
  }

  getFullAddress(): string {
    //TODO: experiment with TS accessors
    return this.fullAddress;
  }

  getLocalPart(): string {
    return this.localPart;
  }

  getDomainPart(): string {
    return this.domainPart;
  }

  toMap(): Map<string, any> {
    const map = new Map<string, string>();
    map.set('fullAddress', this.fullAddress);
    map.set('localPart', this.localPart);
    map.set('domainPart', this.domainPart);
    return map;
  }
}
