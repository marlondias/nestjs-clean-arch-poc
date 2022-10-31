export default interface UseCaseOutputBoundary {
  getMessage(): string;
  toMap(): Map<string, any>;
}
