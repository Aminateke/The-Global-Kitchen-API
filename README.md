# The Global Kitchen API

A RESTful API for managing a digital cookbook. Built with Node.js, Express, and MongoDB, this API allows users to create, read, update, and delete recipes with a focus on best practices including 3-tier architecture, proper validation, and error handling.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas or Local)
- **Configuration:** dotenv

## Features

✨ **Core Functionality:**
- 📖 Create, Read, Update, and Delete (CRUD) recipes
- 🔍 Filter recipes by category and difficulty level
- ✅ Comprehensive input validation
- 🛡️ Global error handling
- 📊 MongoDB schema with proper data types and indexes

✨ **Architecture:**
- 🏗️ 3-Tier Layered Architecture (Routes → Controllers → Services → Models)
- 🔄 Non-blocking async/await operations
- 📝 DRY (Don't Repeat Yourself) principles
- 💪 Proper HTTP status codes and responses

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
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone [your-repo-url]
cd Kitchen-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

Copy `.env.example` to `.env` and add your configuration:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kitchendb?retryWrites=true&w=majority
NODE_ENV=development
```

**MongoDB Setup Options:**

**Option A: MongoDB Atlas (Cloud)**
1. Create a free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Add your IP to the IP whitelist
4. Replace `username:password` with your Atlas credentials

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Use: `mongodb://localhost:27017/kitchendb`

### 4. Start the server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api/recipes
```

### Endpoints

#### 1. **GET /recipes** - Retrieve all recipes
Retrieve all recipes with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., `desserts`, `main-course`)
- `difficulty` (optional): Filter by difficulty (`easy`, `medium`, `hard`)

**Example:**
```bash
GET /api/recipes
GET /api/recipes?category=desserts
GET /api/recipes?difficulty=easy
GET /api/recipes?category=main-course&difficulty=medium
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Chocolate Cake",
      "ingredients": ["flour", "sugar", "eggs", "cocoa"],
      "instructions": "Mix ingredients and bake at 350°F...",
      "cookingTime": 45,
      "difficulty": "medium",
      "category": "desserts",
      "createdAt": "2024-05-17T10:30:00.000Z",
      "updatedAt": "2024-05-17T10:30:00.000Z"
    }
  ]
}
```

#### 2. **POST /recipes** - Create a new recipe
Create a new recipe in the database.

**Request Body:**
```json
{
  "title": "Spaghetti Carbonara",
  "ingredients": ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
  "instructions": "Cook pasta. Fry bacon. Mix with eggs and pasta...",
  "cookingTime": 20,
  "difficulty": "medium",
  "category": "italian"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Spaghetti Carbonara",
    "ingredients": ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
    "instructions": "Cook pasta. Fry bacon. Mix with eggs and pasta...",
    "cookingTime": 20,
    "difficulty": "medium",
    "category": "italian",
    "createdAt": "2024-05-17T11:45:00.000Z",
    "updatedAt": "2024-05-17T11:45:00.000Z"
  }
}
```

#### 3. **GET /recipes/:id** - Retrieve a specific recipe
Get a recipe by its MongoDB ID.

**Example:**
```bash
GET /api/recipes/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Chocolate Cake",
    "ingredients": ["flour", "sugar", "eggs", "cocoa"],
    "instructions": "Mix ingredients and bake at 350°F...",
    "cookingTime": 45,
    "difficulty": "medium",
    "category": "desserts",
    "createdAt": "2024-05-17T10:30:00.000Z",
    "updatedAt": "2024-05-17T10:30:00.000Z"
  }
}
```

#### 4. **PATCH /recipes/:id** - Update a recipe
Update specific fields of a recipe (partial update).

**Request Body (only fields to update):**
```json
{
  "cookingTime": 50,
  "difficulty": "hard"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Chocolate Cake",
    "ingredients": ["flour", "sugar", "eggs", "cocoa"],
    "instructions": "Mix ingredients and bake at 350°F...",
    "cookingTime": 50,
    "difficulty": "hard",
    "category": "desserts",
    "createdAt": "2024-05-17T10:30:00.000Z",
    "updatedAt": "2024-05-17T12:15:00.000Z"
  }
}
```

#### 5. **DELETE /recipes/:id** - Delete a recipe
Remove a recipe from the database.

**Example:**
```bash
DELETE /api/recipes/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Chocolate Cake",
    "ingredients": ["flour", "sugar", "eggs", "cocoa"],
    "instructions": "Mix ingredients and bake at 350°F...",
    "cookingTime": 45,
    "difficulty": "medium",
    "category": "desserts",
    "createdAt": "2024-05-17T10:30:00.000Z",
    "updatedAt": "2024-05-17T10:30:00.000Z"
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

| Status Code | Description |
|------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation or format error |
| 404 | Not Found - Recipe ID doesn't exist |
| 500 | Internal Server Error - Server-side error |

**Error Response Example:**
```json
{
  "success": false,
  "error": "Validation Error: Cooking time must be at least 1 minute",
  "statusCode": 400
}
```

## Recipe Schema

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `title` | String | Required, 3-100 chars | Recipe name |
| `ingredients` | Array | Required, min 1 | List of ingredients |
| `instructions` | String | Required, min 10 chars | Cooking instructions |
| `cookingTime` | Number | Required, min 1 | Time in minutes (positive integer) |
| `difficulty` | String | Enum: easy, medium, hard | Difficulty level |
| `category` | String | Required | Recipe category (e.g., desserts, main-course) |
| `createdAt` | Date | Auto-generated | Creation timestamp |
| `updatedAt` | Date | Auto-generated | Last update timestamp |

## Best Practices Implemented

✅ **MongoDB Schema Optimization**
- Proper BSON data types (Numbers for cookingTime, Date objects for timestamps)
- Schema-level validation (required, min, enum, trim)
- Indexes on frequently queried fields (title, difficulty, category)
- Compound indexes for common query combinations

✅ **DRY Principle**
- Single database connection module (src/config/db.js)
- Centralized business logic in services
- Reusable error handling middleware

✅ **Code Readability**
- Descriptive function and variable names
- Clear comments documenting functions
- Consistent code style

✅ **Non-Blocking I/O**
- All database operations use async/await
- No blocking calls in the event loop

✅ **Error Handling**
- Global error handler middleware
- Proper 404 responses for missing resources
- Validation error messages from MongoDB

✅ **Complete Responses**
- Every controller action ends with res.json() or res.status().json()
- No hanging requests

## Testing the API

### Using cURL

```bash
# Get all recipes
curl http://localhost:5000/api/recipes

# Get recipes by category
curl http://localhost:5000/api/recipes?category=desserts

# Create a recipe
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pasta",
    "ingredients": ["pasta", "sauce"],
    "instructions": "Cook pasta and mix with sauce",
    "cookingTime": 15,
    "difficulty": "easy",
    "category": "italian"
  }'

# Get a specific recipe
curl http://localhost:5000/api/recipes/[RECIPE_ID]

# Update a recipe
curl -X PATCH http://localhost:5000/api/recipes/[RECIPE_ID] \
  -H "Content-Type: application/json" \
  -d '{"cookingTime": 20}'

# Delete a recipe
curl -X DELETE http://localhost:5000/api/recipes/[RECIPE_ID]
```

### Using Postman

1. Import or create requests for each endpoint
2. Use the examples above as request bodies
3. Test with different query parameters and IDs

## Git Setup & Deployment

### 1. Initialize Git repository

```bash
git init
git add .
git commit -m "Initial commit: Global Kitchen API"
```

### 2. Create GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Create a public repository
3. Copy the repository URL

### 3. Push to GitHub

```bash
git remote add origin [your-repo-url]
git branch -M main
git push -u origin main
```

### Important Security Notes

⚠️ **Never commit:**
- `.env` file (contains MONGODB_URI with credentials)
- `node_modules/` folder
- `.DS_Store`, `Thumbs.db`, and other OS files

✅ **Always ensure:**
- `.gitignore` includes `.env`
- MongoDB credentials are never exposed in commits
- Use `.env.example` as a template for documentation

## Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running (local) or if your IP is whitelisted (Atlas)
- Verify `MONGODB_URI` in .env file
- Check username and password in connection string

### Port Already in Use
```bash
# Windows: Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the process ID)
taskkill /PID [PID] /F
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [RESTful API Best Practices](https://restfulapi.net/)

## License

ISC

---

**Created with ❤️ for The Global Kitchen**
