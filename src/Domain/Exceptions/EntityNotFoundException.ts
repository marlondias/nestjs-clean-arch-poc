export default class EntityNotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}
