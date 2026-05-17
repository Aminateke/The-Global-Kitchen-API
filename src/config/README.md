# Configuration Layer

This folder contains all configuration and setup files for the application.

## Files

- **db.js** - MongoDB connection and initialization
  - Handles connecting to MongoDB (Atlas or Local)
  - Sets up connection event listeners
  - Manages disconnection and error events

## Purpose

Centralizes all database connection logic in one place, following the DRY principle. This module is imported in `app.js` to establish the database connection when the server starts.

## Usage

```javascript
const connectDB = require('./src/config/db');
connectDB();
```

## Environment Variables Required

- `MONGODB_URI` - MongoDB connection string
