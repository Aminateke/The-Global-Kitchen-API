const recipeService = require('../services/recipeService');

class RecipeController {
  /**
   * GET /api/recipes
   * Retrieve all recipes with optional category and difficulty filters
   * Query params: category, difficulty
   */
  async getAllRecipes(req, res, next) {
    try {
      const { category, difficulty } = req.query;
      const filters = {};

      if (category) filters.category = category;
      if (difficulty) filters.difficulty = difficulty;

      const recipes = await recipeService.getAllRecipes(filters);

      res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/recipes/:id
   * Retrieve a specific recipe by ID
   */
  async getRecipeById(req, res, next) {
    try {
      const { id } = req.params;

      const recipe = await recipeService.getRecipeById(id);

      res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/recipes
   * Create a new recipe
   */
  async createRecipe(req, res, next) {
    try {
      const recipeData = req.body;

      const newRecipe = await recipeService.createRecipe(recipeData);

      res.status(201).json({
        success: true,
        message: 'Recipe created successfully',
        data: newRecipe,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/recipes/:id
   * Update specific fields of a recipe
   */
  async updateRecipe(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate that at least one field is provided
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'At least one field must be provided to update',
        });
      }

      const updatedRecipe = await recipeService.updateRecipe(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Recipe updated successfully',
        data: updatedRecipe,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/recipes/:id
   * Delete a recipe
   */
  async deleteRecipe(req, res, next) {
    try {
      const { id } = req.params;

      const deletedRecipe = await recipeService.deleteRecipe(id);

      res.status(200).json({
        success: true,
        message: 'Recipe deleted successfully',
        data: deletedRecipe,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RecipeController();
