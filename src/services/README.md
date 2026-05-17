# Services Layer

This folder contains all business logic for the application.

## Files

- **recipeService.js** - Recipe business logic
  - `getAllRecipes()` - Fetch recipes with optional filters
  - `getRecipeById()` - Fetch a specific recipe
  - `createRecipe()` - Create and validate new recipe
  - `updateRecipe()` - Update recipe fields
  - `deleteRecipe()` - Remove a recipe
  - `validateRecipeData()` - Validate recipe input

## Purpose

Services contain:
1. **Business Logic** - How the application actually works
2. **Data Validation** - Ensuring data integrity
3. **Database Interactions** - CRUD operations using Models
4. **Error Handling** - Converting technical errors to user-friendly messages

## Key Principles

- Services are INDEPENDENT of HTTP (no req/res objects)
- All validation logic goes in services
- Services use async/await for non-blocking I/O
- Services throw descriptive errors that controllers can handle

## Architecture Flow

```
Routes → Controllers → Services → Models → Database
  ↓         ↓            ↓
Define  Extract      Execute   Write
Routes  Data         Logic     Data
```

## Validation

Services validate:
- Required fields exist
- Data types are correct
- Cooking time is positive
- Difficulty is one of [easy, medium, hard]
- Arrays are non-empty where required

## Example Usage

```javascript
const recipeService = require('./recipeService');

// Get recipes by category
const recipes = await recipeService.getAllRecipes({ 
  category: 'desserts' 
});

// Create a new recipe
const newRecipe = await recipeService.createRecipe({
  title: 'Cake',
  ingredients: ['flour', 'eggs'],
  instructions: 'Mix and bake',
  cookingTime: 45,
  difficulty: 'medium',
  category: 'desserts'
});
```

## Error Messages

Services throw descriptive errors:
- "Title is required"
- "Cooking time must be a positive number"
- "Difficulty must be: easy, medium, or hard"
- "Recipe not found"

These errors are caught by controllers and sent to the error handler middleware.
