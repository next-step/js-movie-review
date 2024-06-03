export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

export class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = "HttpError";
  }
}
