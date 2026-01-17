export class BrowserManagerError extends Error {
  code: string;

  constructor(code: string, message: string, cause?: unknown) {
    super(message, cause ? { cause } : undefined);
    this.name = "BrowserManagerError";
    this.code = code;
  }
}
