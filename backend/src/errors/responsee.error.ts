import { ErrorType } from "../core/errorTypeEnum.js";

export class ResponseError extends Error {
  status: number;
  errorType?: ErrorType;

  constructor(status: number, message: string, errorType?: ErrorType) {
    super(message);
    this.status = status;
    this.errorType = errorType;
  }
}
