import UseCaseOutputBoundary from 'src/Application/Contracts/UseCaseOutputBoundary';
import User from 'src/Domain/Entities/User';

export default class OutputBoundary implements UseCaseOutputBoundary {
  private message: string;
  private users: User[];

  constructor(message: string) {
    this.message = message;
    this.users = [];
  }

  getMessage(): string {
    return this.message;
  }

  toMap(): Map<string, any> {
    const map = new Map<string, any>();
    const usersAsMaps = this.users.map((user) => {
      return user.toMap();
    });
    map.set('users', usersAsMaps);
    return map;
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
