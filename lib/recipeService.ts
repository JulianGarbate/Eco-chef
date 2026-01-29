import api from './api';
import type { Recipe, SavedRecipe } from '@/types';
import { translateIngredientsToEnglish, translateWithMyMemory } from './translations';

export const recipeService = {
  async searchRecipes(ingredients: string[]) {
    // Traducir ingredientes al inglés para la API
    const englishIngredients = translateIngredientsToEnglish(ingredients);
    
    const response = await api.post<Recipe[]>('/recipes/buscar', { 
      ingredients: englishIngredients
    });
    
    return response.data;
  },

  async saveRecipe(userId: string, recipe: Recipe) {
    const response = await api.post('/recipes/guardar', {
      recipe: recipe,
    });
    return response.data;
  },

  async getSavedRecipes(userId: string) {
    const response = await api.get<SavedRecipe[]>(`/recipes/usuario/${userId}`);
    return response.data;
  },

  async deleteRecipe(userId: string, recipeId: string) {
    const response = await api.delete('/recipes/eliminar', {
      data: { recipeId },
    });
    return response.data;
  },

  async getRecipeDetail(recipeId: string) {
    // Obtener detalles de la receta desde la API del backend (que obtiene de la BD)
    const response = await api.get(`/recipes/${recipeId}`);
    return response.data;
  },
};

