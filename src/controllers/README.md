# Controllers Layer

This folder contains all request/response handlers for API endpoints.

## Files

- **recipeControllers.js** - Recipe CRUD operation handlers
  - `getAllRecipes()` - Handle GET /recipes requests
  - `getRecipeById()` - Handle GET /recipes/:id requests
  - `createRecipe()` - Handle POST /recipes requests
  - `updateRecipe()` - Handle PATCH /recipes/:id requests
  - `deleteRecipe()` - Handle DELETE /recipes/:id requests

## Purpose

Controllers are the bridge between HTTP requests/responses and business logic. They:
1. Extract data from requests (params, query, body)
2. Call appropriate service methods
3. Handle errors and pass them to error middleware
4. Send properly formatted responses

## Key Principles

- Controllers do NOT contain business logic
- All validation and data processing happens in Services
- Every action must end with res.json() or res.status().json()
- Use `next(error)` to pass errors to the error handler middleware

## Example

```javascript
async getAllRecipes(req, res, next) {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    next(error); // Pass to error handler
  }
}
```
