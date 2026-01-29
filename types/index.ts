export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface IngredientMeasure {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  image: string;
  readyInMinutes?: number;
  type?: string;
  ingredients?: string[];
  ingredientMeasures?: IngredientMeasure[];
  instructions?: string[];
  summary?: string;
  servings?: number;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: Ingredient[];
  usedIngredients?: Ingredient[];
  unusedIngredients?: Ingredient[];
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image: string;
}

export interface SavedRecipe {
  id: string;
  userId: string;
  recipeId: string;
  title?: string;
  image?: string;
  createdAt: string;
}

export interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  instructions: string;
  extendedIngredients: ExtendedIngredient[];
  readyInMinutes: number;
  servings: number;
  summary?: string;
}

export interface ExtendedIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

