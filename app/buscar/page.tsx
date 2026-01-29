'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import IngredientInput from '@/components/IngredientInput';
import RecipeCard from '@/components/RecipeCard';
import { recipeService } from '@/lib/recipeService';
import { translateWithMyMemory } from '@/lib/translations';
import { recentRecipesManager, type RecentRecipe } from '@/lib/recentRecipes';
import type { Recipe } from '@/types';

export default function BuscarPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<RecentRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  // Cargar recetas recientes al montar el componente
  useEffect(() => {
    const recent = recentRecipesManager.getRecentRecipes();
    setRecentRecipes(recent);
  }, []);

  const handleSearch = async (ingredients: string[]) => {
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      console.log('Iniciando búsqueda con ingredientes:', ingredients);
      const results = await recipeService.searchRecipes(ingredients);
      console.log('Resultados recibidos:', results);
      
      // Traducir títulos de las recetas
      const translatedResults = await Promise.all(
        results.map(async (recipe) => {
          try {
            if (recipe.title) {
              recipe.title = await translateWithMyMemory(recipe.title);
            }
          } catch (err) {
            console.error('Error traduciendo receta:', err);
            // Mantener título original si falla
          }
          return recipe;
        })
      );
      
      console.log('Resultados traducidos:', translatedResults);
      setRecipes(translatedResults);
      
      // Agregar a recientes
      recentRecipesManager.addMultipleRecipes(translatedResults);
      const recent = recentRecipesManager.getRecentRecipes();
      setRecentRecipes(recent);
      
      if (translatedResults.length === 0) {
        setError('No se encontraron recetas con esos ingredientes. Intenta con otros.');
      }
    } catch (err: any) {
      console.error('Error completo en búsqueda:', err);
      console.error('Respuesta de error:', err.response);
      setError(err.response?.data?.error || err.message || 'Error al buscar recetas. Intenta de nuevo.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <IngredientInput onSearch={handleSearch} isLoading={loading} />

        {loading && (
          <div className="text-center mt-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4">Buscando las mejores recetas...</p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mt-8 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 rounded text-center">
            <p className="font-semibold">{error}</p>
            {error.includes('límite diario') && (
              <p className="text-sm mt-2 text-red-600">
                Mientras tanto, puedes ver tus recetas guardadas en "Mis Recetas" o "Todas las Recetas".
              </p>
            )}
          </div>
        )}

        {!loading && searched && recipes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Encontramos {recipes.length} {recipes.length === 1 ? 'receta' : 'recetas'} para ti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {!loading && !searched && recentRecipes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Recetas Buscadas Recientemente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRecipes.map((recipe) => (
                <RecipeCard key={`${recipe.id}-recent`} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {!loading && !searched && recentRecipes.length === 0 && (
          <div className="text-center mt-12 text-gray-500">
            <p className="text-lg">Ingresa tus ingredientes para comenzar</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
