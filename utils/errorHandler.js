class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidDataError";
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

module.exports = {
  NotFoundError,
  InvalidDataError,
  InternalServerError,
};
