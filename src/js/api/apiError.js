import { ERROR_MSG } from "./constants";

export class ApiError extends Error {
  constructor(message, details, status = -1) {
    super(message);
    this.details = details;
    this.status = status;
  }

  static handle(error) {
    let errMsg;
    let errDetails;

    switch (parseInt(error.message)) {
      case 401:
        errMsg = ERROR_MSG.INVALID_API_KEY.message;
        errDetails = ERROR_MSG.INVALID_API_KEY.details;
        break;
      case 404:
        errMsg = ERROR_MSG.INVALID_REQUEST.message;
        errDetails = ERROR_MSG.INVALID_REQUEST.details;
        break;
      default:
        errMsg = ERROR_MSG.DEFAULT.message;
        errDetails = ERROR_MSG.DEFAULT.details;
        break;
    }

    throw new ApiError(errMsg, errDetails, error.status);
  }
}
