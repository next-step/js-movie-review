export class ApiError extends Error {
  status;

  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message) {
    super(401, message);
  }
}

export class InternetServerError extends ApiError {
  constructor(message) {
    super(500, message);
  }
}
