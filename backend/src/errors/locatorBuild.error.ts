export class LocatorBuilderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocatorBuilderError";
  }
}
