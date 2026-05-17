# Models Layer

This folder contains MongoDB schema definitions using Mongoose.

## Files

- **Recipe.js** - Recipe schema definition
  - Defines the structure of recipe documents in MongoDB
  - Implements validation rules at the schema level
  - Creates indexes for performance optimization

## Recipe Schema Fields

| Field | Type | Constraints |
|-------|------|-------------|
| title | String | Required, 3-100 chars, indexed |
| ingredients | Array[String] | Required, minimum 1 item |
| instructions | String | Required, minimum 10 chars |
| cookingTime | Number | Required, positive integer only |
| difficulty | String | Required, enum: [easy, medium, hard] |
| category | String | Required, indexed |
| createdAt | Date | Auto-generated, indexed |
| updatedAt | Date | Auto-generated |

## Purpose

Models define:
1. **Schema Structure** - What fields exist and their types
2. **Validation Rules** - Data integrity constraints
3. **Indexes** - Performance optimization for queries
4. **Pre/Post Hooks** - Logic that runs before or after operations

## Key Principles

- Use proper BSON data types (Numbers for cookingTime, not strings)
- Implement schema-level validation for data hygiene
- Create indexes on frequently queried fields
- Use enums for fields with limited values

## MongoDB Best Practices Implemented

✅ Data type optimization
✅ Schema-level validation
✅ Single-field and compound indexes
✅ Automatic timestamps
✅ Pre-save middleware for data transformation

## Example Usage

```javascript
const Recipe = require('./src/models/Recipe');
const newRecipe = new Recipe({ title: 'Pasta', ... });
await newRecipe.save();
```
