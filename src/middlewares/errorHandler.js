/**
 * Global Error Handler Middleware
 * This middleware catches all errors and returns appropriate HTTP responses
 */
const errorHandler = (error, req, res, next) => {
  console.error('❌ Error:', error.message);

  // Default error response
  let statusCode = 500;
  let message = error.message || 'Internal Server Error';

  // Handle MongoDB Validation Errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    const messages = Object.values(error.errors)
      .map((err) => err.message)
      .join(', ');
    message = `Validation Error: ${messages}`;
  }

  // Handle MongoDB Cast Errors (invalid ID format)
  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Handle MongoDB Duplicate Key Errors
  if (error.code === 11000) {
    statusCode = 400;
    const field = Object.keys(error.keyValue)[0];
    message = `A recipe with this ${field} already exists`;
  }

  // Handle "Recipe not found" errors
  if (error.message === 'Recipe not found') {
    statusCode = 404;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode: statusCode,
  });
};

module.exports = errorHandler;
