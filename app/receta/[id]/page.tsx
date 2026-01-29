'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { recipeService } from '@/lib/recipeService';
import { authService } from '@/lib/authService';
import type { Recipe } from '@/types';

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  const loadRecipe = async () => {
    try {
      console.log('🔍 Cargando receta con ID:', recipeId);
      // Obtener detalles de la receta desde la BD
      const data = await recipeService.getRecipeDetail(recipeId);
      console.log('✅ Receta cargada desde BD:', data);
      setRecipe(data);
    } catch (err) {
      console.error('❌ Error al cargar la receta:', err);
      setError('Error al cargar la receta');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const userId = authService.getUserId();
    if (!userId) return;

    setSaving(true);
    try {
      if (!recipe) return;
      await recipeService.saveRecipe(userId, recipe);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Error al guardar la receta');
    } finally {
      setSaving(false);
    }
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-white mb-4"></div>
            <p className="text-xl text-gray-600 font-semibold">Cargando receta deliciosa...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !recipe) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              {error || 'Receta no encontrada'}
            </h1>
            <Link
              href="/buscar"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition font-semibold text-lg"
            >
              Volver a buscar
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header con botón volver */}
          <div className="mb-8">
            <Link
              href="/buscar"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-lg transition hover:gap-3"
            >
              ← Volver a resultados
            </Link>
          </div>

          {/* Sección principal: Imagen y detalles */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Imagen grande */}
            <div className="lg:col-span-1">
              <div className="h-96 w-full bg-gray-200 rounded-2xl overflow-hidden shadow-2xl sticky top-8">
                <Image
                  src={recipe.image || '/placeholder-recipe.jpg'}
                  alt={recipe.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Contenido principal */}
            <div className="lg:col-span-2">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {recipe.title}
              </h1>

              {/* Datos rápidos */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {recipe.readyInMinutes && (
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                    <div className="text-4xl font-bold mb-2">{recipe.readyInMinutes}</div>
                    <div className="text-blue-100 font-semibold">Minutos</div>
                  </div>
                )}
                {recipe.servings && (
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                    <div className="text-4xl font-bold mb-2">{recipe.servings}</div>
                    <div className="text-purple-100 font-semibold">Porciones</div>
                  </div>
                )}
              </div>

              {/* Descripción */}
              {recipe.summary && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 p-6 rounded-2xl mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {stripHtml(recipe.summary).substring(0, 300)}...
                  </p>
                </div>
              )}

              {/* Botón guardar prominente */}
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className={`w-full py-5 px-8 rounded-2xl transition font-bold text-xl border-2 shadow-lg ${
                  saved
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-green-600 bg-white hover:bg-green-50 text-green-600 hover:shadow-xl'
                }`}
              >
                {saved ? '✓ Guardada en mis recetas' : saving ? 'Guardando...' : 'Guardar en mis recetas'}
              </button>
            </div>
          </div>

          {/* Ingredientes e Instrucciones */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Ingredientes */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-green-600">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
                <h2 className="text-3xl font-bold">Ingredientes</h2>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {recipe.ingredientMeasures && recipe.ingredientMeasures.length > 0 ? (
                    recipe.ingredientMeasures.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl hover:from-green-100 transition border-l-4 border-green-600"
                      >
                        <span className="text-green-600 font-bold text-2xl mt-0">•</span>
                        <div className="pt-1 flex-grow">
                          <span className="text-gray-700 text-lg">
                            <span className="font-bold text-green-700">{ingredient.amount}</span>{' '}
                            <span className="text-gray-600">{ingredient.unit}</span> de{' '}
                            <span className="font-semibold">{ingredient.name}</span>
                          </span>
                        </div>
                      </li>
                    ))
                  ) : recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl hover:from-green-100 transition border-l-4 border-green-600"
                      >
                        <span className="text-green-600 font-bold text-2xl mt-0">•</span>
                        <span className="text-gray-700 text-lg pt-1">{ingredient}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No hay información de ingredientes disponible</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-600">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                <h2 className="text-3xl font-bold">Modo de Preparación</h2>
              </div>
              <div className="p-8">
                {recipe.instructions && (Array.isArray(recipe.instructions) ? recipe.instructions.length > 0 : !!recipe.instructions) ? (
                  <div className="space-y-5">
                    {Array.isArray(recipe.instructions) ? (
                      // Si es array de strings (desde Groq)
                      recipe.instructions.map((instruction, index) => (
                        <div key={index} className="flex gap-5">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg">
                              {index + 1}
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="text-gray-700 text-lg leading-relaxed">
                              {instruction}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Si es string (legacy de Spoonacular)
                      stripHtml(recipe.instructions as string)
                        .split(/\.\s+|\n+/)
                        .filter((line) => line.trim().length > 5)
                        .map((paragraph, index) => (
                          <div key={index} className="flex gap-5">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg">
                                {index + 1}
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="text-gray-700 text-lg leading-relaxed">
                                {paragraph.trim()}.
                              </p>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-lg bg-gray-50 p-6 rounded-xl">
                    No hay instrucciones disponibles para esta receta.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
