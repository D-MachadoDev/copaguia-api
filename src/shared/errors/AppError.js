// Error personalizado para la aplicación

class AppError extends Error {

  constructor(message, statusCode = 500) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Error operacional (esperado)

    // Captura el stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;