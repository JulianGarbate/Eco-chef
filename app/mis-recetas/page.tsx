'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import RecipeSkeleton from '@/components/RecipeSkeleton';
import { recipeService } from '@/lib/recipeService';
import { authService } from '@/lib/authService';
import Image from 'next/image';
import Link from 'next/link';

interface SavedRecipeWithDetails {
  id: string;
  recipeId: string;
  title?: string;
  image?: string;
}

export default function MisRecetasPage() {
  const [recipes, setRecipes] = useState<SavedRecipeWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = async () => {
    const userId = authService.getUserId();
    console.log('loadSavedRecipes - userId:', userId);
    if (!userId) return;

    try {
      const savedRecipes = await recipeService.getSavedRecipes(userId);
      console.log('Recetas guardadas obtenidas:', savedRecipes);
      
      // Si la receta tiene título e imagen guardados, usarlos directamente
      const recipesWithDetails = savedRecipes.map((saved) => ({
        id: saved.id,
        recipeId: saved.recipeId,
        title: saved.title || 'Receta no disponible',
        image: saved.image || '',
      }));

      console.log('Recetas con detalles:', recipesWithDetails);
      setRecipes(recipesWithDetails);
    } catch (err) {
      console.error('Error al cargar tus recetas guardadas:', err);
      setError('Error al cargar tus recetas guardadas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId: string) => {
    const userId = authService.getUserId();
    if (!userId) return;

    if (!confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      return;
    }

    try {
      await recipeService.deleteRecipe(userId, recipeId);
      setRecipes(recipes.filter((r) => r.recipeId !== recipeId));
    } catch (err) {
      alert('Error al eliminar la receta');
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Mis Recetas Guardadas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RecipeSkeleton key={i} />
            ))}
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Mis Recetas Guardadas
        </h1>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-6">
              Aún no tienes recetas guardadas
            </p>
            <Link
              href="/buscar"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Buscar Recetas →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-8">
              Tienes {recipes.length} receta{recipes.length !== 1 ? 's' : ''} guardada{recipes.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-b-4 border-green-500 flex flex-col"
                >
                  <div className="relative h-48 w-full bg-gray-200">
                    {recipe.image && (
                      <Image
                        src={recipe.image}
                        alt={recipe.title || 'Receta'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2 min-h-[3.5rem]">
                      {recipe.title}
                    </h3>
                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/receta/${recipe.recipeId}`}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700 transition font-semibold"
                      >
                        Ver Receta
                      </Link>
                      <button
                        onClick={() => handleDelete(recipe.recipeId)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                        title="Eliminar receta"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
