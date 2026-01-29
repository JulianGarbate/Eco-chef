'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import RecipeSkeleton from '@/components/RecipeSkeleton';
import Image from 'next/image';
import Link from 'next/link';

interface SavedRecipeWithDetails {
  id: string;
  recipeId: string;
  userId: string;
  title?: string;
  image?: string;
  userEmail?: string;
}

interface AllRecipesResponse {
  id: string;
  recipeId: string;
  userId: string;
  title?: string;
  image?: string;
  user: {
    email: string;
  };
}

export default function TodasLasRecetasPage() {
  const [recipes, setRecipes] = useState<SavedRecipeWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAllRecipes();
  }, []);

  const loadAllRecipes = async () => {
    try {
      console.log('Iniciando carga de todas las recetas...');
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/todas`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const savedRecipes: AllRecipesResponse[] = await response.json();
      console.log('Recetas obtenidas:', savedRecipes.length);

      // Usar los datos guardados directamente sin hacer más llamadas a Spoonacular
      const recipesWithDetails = savedRecipes.map((saved) => ({
        id: saved.id,
        recipeId: saved.recipeId,
        userId: saved.userId,
        userEmail: saved.user.email,
        title: saved.title || 'Receta no disponible',
        image: saved.image || '',
      }));

      setRecipes(recipesWithDetails);
    } catch (err) {
      console.error('Error completo al cargar todas las recetas:', err);
      setError('Error al cargar las recetas de la base de datos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Todas las Recetas de la Base de Datos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
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
          Todas las Recetas de la Base de Datos
        </h1>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-6">
              No hay recetas guardadas en la base de datos
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
              Total de {recipes.length} receta{recipes.length !== 1 ? 's' : ''} guardada{recipes.length !== 1 ? 's' : ''} en la base de datos
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-b-4 border-blue-500 flex flex-col"
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {recipe.title}
                    </h3>
                    {recipe.userEmail && (
                      <p className="text-sm text-gray-500 mb-4">
                        Guardada por: <span className="font-medium text-gray-700">{recipe.userEmail}</span>
                      </p>
                    )}
                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/receta/${recipe.recipeId}`}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition font-semibold"
                      >
                        Ver Receta
                      </Link>
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
