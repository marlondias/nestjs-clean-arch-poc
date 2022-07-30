export default abstract class Entity {
  id: string | number;

  getId(): string | number {
    return this.id;
  }

  setId(id: string | number): void {
    id = typeof id === 'string' ? id.trim() : id.toFixed(0);
    if (typeof id === 'number' && id < 1) {
      throw new Error('Entity ID, when numeric, cannot be zero or negative.');
    }
    if (typeof id === 'string' && id.length < 1) {
      throw new Error('Entity ID, when text, cannot be empty.');
    }
    this.id = id;
  }

  abstract toMap(): Map<string, any>;
}
