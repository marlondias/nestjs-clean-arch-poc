import EmailAddress from '../ValueObjects/EmailAddress';
import PersonName from '../ValueObjects/PersonName';

export default class User {
  protected name: PersonName;
  protected email: EmailAddress;
  protected hashedPassword: string;
  protected emailVerifiedAt: Date;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor() {
    //TODO
  }
}
