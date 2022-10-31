import UseCaseOutputBoundary from 'src/Application/Contracts/UseCaseOutputBoundary';

export default class OutputBoundary implements UseCaseOutputBoundary {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  getMessage(): string {
    return this.message;
  }

  toMap(): Map<string, any> {
    return null;
  }
}
