import UseCaseInputBoundary from 'src/Application/Contracts/UseCaseInputBoundary';

export default class InputBoundary implements UseCaseInputBoundary {
  private userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }
}
