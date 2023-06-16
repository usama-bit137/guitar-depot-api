// We want the result to filter through here
// before it goes to the globalErrorHandler!!!
class AppError extends Error {
  // we supply the statusCode only
  // we inherit the message from the parent class Error:
  constructor(message, statusCode) {
    super(message);

    // custom properties:
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';

    // we also create our own custom property;
    this.isOperational = true;
    // This will check for operational errors,
    // this is always true because, we only test
    // for operational errors in this class.
    // we will allow other errors types to filter through
    // this class and to the globalErrorHandler module.

    // we also want the stack trace:
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
