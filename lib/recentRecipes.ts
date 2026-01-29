import type { Recipe } from '@/types';

const RECENT_RECIPES_KEY = 'eco-chef-recent-recipes';
const MAX_RECENT_RECIPES = 12;

export interface RecentRecipe extends Recipe {
  searchedAt: number;
}

export const recentRecipesManager = {
  // Obtener recetas buscadas recientemente
  getRecentRecipes(): RecentRecipe[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(RECENT_RECIPES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al leer recetas recientes:', error);
      return [];
    }
  },

  // Agregar receta a la lista de recientes (sin duplicados)
  addRecentRecipe(recipe: Recipe): void {
    if (typeof window === 'undefined') return;
    
    try {
      let recent = this.getRecentRecipes();
      
      // Filtrar si ya existe esta receta por ID
      recent = recent.filter(r => r.id !== recipe.id);
      
      // Agregar al inicio con timestamp
      const newRecent: RecentRecipe = {
        ...recipe,
        searchedAt: Date.now()
      };
      
      recent.unshift(newRecent);
      
      // Mantener solo las últimas MAX_RECENT_RECIPES
      recent = recent.slice(0, MAX_RECENT_RECIPES);
      
      localStorage.setItem(RECENT_RECIPES_KEY, JSON.stringify(recent));
    } catch (error) {
      console.error('Error al guardar recetas recientes:', error);
    }
  },

  // Agregar múltiples recetas
  addMultipleRecipes(recipes: Recipe[]): void {
    recipes.forEach(recipe => this.addRecentRecipe(recipe));
  },

  // Limpiar recetas recientes
  clearRecentRecipes(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(RECENT_RECIPES_KEY);
    } catch (error) {
      console.error('Error al limpiar recetas recientes:', error);
    }
  }
};
