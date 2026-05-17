const express = require('express');
const recipeController = require('../controllers/recipeControllers');

const router = express.Router();

// GET all recipes (with optional filters: category, difficulty)
router.get('/', recipeController.getAllRecipes.bind(recipeController));

// POST create a new recipe
router.post('/', recipeController.createRecipe.bind(recipeController));

// GET a specific recipe by ID
router.get('/:id', recipeController.getRecipeById.bind(recipeController));

// PATCH update a recipe
router.patch('/:id', recipeController.updateRecipe.bind(recipeController));

// DELETE a recipe
router.delete('/:id', recipeController.deleteRecipe.bind(recipeController));

module.exports = router;
