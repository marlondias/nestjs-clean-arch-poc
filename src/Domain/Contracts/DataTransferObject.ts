export default interface DataTransferObject {
  fill(fillData: Map<string, any>): void;

  toMap(): Map<string, any>;
}
