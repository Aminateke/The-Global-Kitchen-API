# Middlewares Layer

This folder contains middleware functions that process requests/responses throughout the application.

## Files

- **errorHandler.js** - Global error handling middleware
  - Catches all errors from routes and controllers
  - Converts errors to appropriate HTTP responses
  - Handles MongoDB-specific errors (validation, cast errors, duplicates)
  - Returns consistent error format

## Purpose

Middleware functions process requests before they reach controllers or after responses are sent. The error handler is a special middleware that catches errors from anywhere in the application.

## Error Handler Features

- Catches and logs all errors
- Handles MongoDB validation errors
- Handles invalid MongoDB ID formats (CastError)
- Handles duplicate key errors
- Returns appropriate HTTP status codes
- Returns consistent JSON error responses

## Key Principles

- Error handler middleware must be registered LAST in app.js
- All errors should be passed to next(error) for centralized handling
- Never let errors crash the server

## Status Codes Handled

- 400 - Validation or format errors
- 404 - Resource not found
- 500 - Internal server errors
