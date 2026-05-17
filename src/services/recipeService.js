const Recipe = require('../models/Recipe');

class RecipeService {
  /**
   * Get all recipes with optional category filter
   * @param {Object} filters - Query filters (e.g., { category: 'desserts' })
   * @returns {Promise<Array>} Array of recipes
   */
  async getAllRecipes(filters = {}) {
    try {
      const query = {};

      // Apply category filter if provided
      if (filters.category) {
        query.category = filters.category.toLowerCase();
      }

      // Apply difficulty filter if provided
      if (filters.difficulty) {
        query.difficulty = filters.difficulty.toLowerCase();
      }

      const recipes = await Recipe.find(query).sort({ createdAt: -1 });
      return recipes;
    } catch (error) {
      throw new Error(`Failed to fetch recipes: ${error.message}`);
    }
  }

  /**
   * Get a recipe by ID
   * @param {String} recipeId - Recipe MongoDB ID
   * @returns {Promise<Object>} Recipe document
   */
  async getRecipeById(recipeId) {
    try {
      const recipe = await Recipe.findById(recipeId);

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      return recipe;
    } catch (error) {
      throw new Error(`Failed to fetch recipe: ${error.message}`);
    }
  }

  /**
   * Create a new recipe
   * @param {Object} recipeData - Recipe data object
   * @returns {Promise<Object>} Created recipe document
   */
  async createRecipe(recipeData) {
    try {
      // Validate required fields
      this.validateRecipeData(recipeData);

      const recipe = new Recipe(recipeData);
      const savedRecipe = await recipe.save();

      return savedRecipe;
    } catch (error) {
      throw new Error(`Failed to create recipe: ${error.message}`);
    }
  }

  /**
   * Update a recipe (partial update)
   * @param {String} recipeId - Recipe MongoDB ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated recipe document
   */
  async updateRecipe(recipeId, updateData) {
    try {
      // Don't allow updating certain fields
      delete updateData.createdAt;

      const recipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      return recipe;
    } catch (error) {
      throw new Error(`Failed to update recipe: ${error.message}`);
    }
  }

  /**
   * Delete a recipe
   * @param {String} recipeId - Recipe MongoDB ID
   * @returns {Promise<Object>} Deleted recipe document
   */
  async deleteRecipe(recipeId) {
    try {
      const recipe = await Recipe.findByIdAndDelete(recipeId);

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      return recipe;
    } catch (error) {
      throw new Error(`Failed to delete recipe: ${error.message}`);
    }
  }

  /**
   * Validate recipe data before saving
   * @param {Object} data - Data to validate
   */
  validateRecipeData(data) {
    if (!data.title || !data.title.trim()) {
      throw new Error('Title is required');
    }

    if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
      throw new Error('At least one ingredient is required');
    }

    if (!data.instructions || !data.instructions.trim()) {
      throw new Error('Instructions are required');
    }

    if (typeof data.cookingTime !== 'number' || data.cookingTime <= 0) {
      throw new Error('Cooking time must be a positive number');
    }

    if (!['easy', 'medium', 'hard'].includes(data.difficulty?.toLowerCase())) {
      throw new Error('Difficulty must be: easy, medium, or hard');
    }

    if (!data.category || !data.category.trim()) {
      throw new Error('Category is required');
    }
  }
}

module.exports = new RecipeService();
