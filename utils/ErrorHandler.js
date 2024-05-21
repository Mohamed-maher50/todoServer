class ErrorHandler extends Error {
  constructor(name = "serverError", message, status = 500) {
    super(message, {
      cause: status,
    });
    this.name = name;
    this.status = status;
  }
}

module.exports = ErrorHandler;
