class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = null) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.success = false;
      this.errors = errors;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export { ApiError };
  