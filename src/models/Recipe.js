const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
      index: true, // Index for faster lookups
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients array is required'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one ingredient is required',
      },
    },
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
      trim: true,
      minlength: [10, 'Instructions must be at least 10 characters'],
    },
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be at least 1 minute'],
      validate: {
        validator: Number.isInteger,
        message: 'Cooking time must be a whole number (minutes)',
      },
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be one of: easy, medium, hard',
      },
      required: [true, 'Difficulty level is required'],
      lowercase: true,
      index: true, // Index for filtering
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
      index: true, // Index for category filter
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Compound index for frequently combined queries
recipeSchema.index({ category: 1, difficulty: 1 });

// Pre-save middleware to ensure updatedAt is set
recipeSchema.pre('findByIdAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
