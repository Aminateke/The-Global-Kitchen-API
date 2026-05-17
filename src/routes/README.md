# Routes Layer

This folder contains all API endpoint definitions and routing logic.

## Files

- **recipeRoutes.js** - Recipe API endpoints
  - GET /recipes - Retrieve all recipes
  - POST /recipes - Create new recipe
  - GET /recipes/:id - Retrieve specific recipe
  - PATCH /recipes/:id - Update recipe
  - DELETE /recipes/:id - Delete recipe

## Purpose

Routes define:
1. **HTTP Methods** - GET, POST, PATCH, DELETE
2. **Endpoints** - The URL paths
3. **Controller Mapping** - Which controller handles each route

## Route Structure

```javascript
router.get('/', controller.getAllRecipes);    // GET /api/recipes
router.post('/', controller.createRecipe);    // POST /api/recipes
router.get('/:id', controller.getRecipeById); // GET /api/recipes/:id
router.patch('/:id', controller.updateRecipe); // PATCH /api/recipes/:id
router.delete('/:id', controller.deleteRecipe); // DELETE /api/recipes/:id
```

## Key Principles

- Routes only map HTTP methods to controllers
- No business logic in routes
- Parameter validation happens in controllers/services
- Routes are mounted in app.js with a base path (/api/recipes)

## REST Conventions

- GET - Safe, idempotent, retrieves data
- POST - Creates new resources
- PATCH - Partial updates to existing resources
- DELETE - Removes resources

## Example

```javascript
// Routes/recipeRoutes.js is mounted in app.js as:
app.use('/api/recipes', recipeRoutes);

// Results in:
// GET  http://localhost:5000/api/recipes
// POST http://localhost:5000/api/recipes
// GET  http://localhost:5000/api/recipes/:id
// etc.
```
