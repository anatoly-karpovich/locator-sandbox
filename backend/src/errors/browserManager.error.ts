export class BrowserManagerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BrowserManagerError";
  }
}
