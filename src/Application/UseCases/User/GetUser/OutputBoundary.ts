import UseCaseOutputBoundary from 'src/Application/Contracts/UseCaseOutputBoundary';
import User from 'src/Domain/Entities/User';

export default class OutputBoundary implements UseCaseOutputBoundary {
  private message: string;
  private user: User;

  constructor(message: string) {
    this.message = message;
  }

  getMessage(): string {
    return this.message;
  }

  toMap(): Map<string, any> {
    const map = new Map<string, any>();
    map.set('user', this.user.toMap());
    return map;
  }

  setUser(user: User): void {
    this.user = user;
  }
}
