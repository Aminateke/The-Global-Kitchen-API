# The Global Kitchen API

A RESTful API for managing a digital cookbook. Built with Node.js, Express, and MongoDB, this API allows users to create, read, update, and delete recipes with a focus on best practices including 3-tier architecture, proper validation, and error handling.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas or Local)
- **Configuration:** dotenv

## Project Structure

```
Kitchen-API/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   └── recipeControllers.js  # Request/response handling logic
│   ├── middlewares/
│   │   └── errorHandler.js       # Global error handling middleware
│   ├── models/
│   │   └── Recipe.js             # MongoDB schema definition
│   ├── routes/
│   │   └── recipeRoutes.js       # API endpoint routes
│   └── services/
│       └── recipeService.js      # Business logic layer
├── app.js                        # Express app setup and entry point
├── package.json                  # Project dependencies and scripts
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
└── README.md                     # This file