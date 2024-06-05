import { ERROR_MSG } from "./constants";

export class ApiError extends Error {
  status = -1;

  constructor(message, status) {
    super(message);
    this.status = status;
  }

  static handle(error) {
    switch (parseInt(error.message)) {
      case 401:
        throw new Error(ERROR_MSG.INVALID_API_KEY);
      case 404:
        throw new Error(ERROR_MSG.INVALID_REQUEST);
      default:
        throw new Error(ERROR_MSG.DEFAULT);
    }
  }
}
