'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { recipeService } from '@/lib/recipeService';
import { authService } from '@/lib/authService';
import type { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: () => void;
  showSaveButton?: boolean;
}

export default function RecipeCard({ 
  recipe, 
  onSave, 
  showSaveButton = true 
}: RecipeCardProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const userId = authService.getUserId();
    if (!userId) return;

    setSaving(true);
    try {
      await recipeService.saveRecipe(userId, recipe);
      setSaved(true);
      if (onSave) onSave();
      
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error al guardar la receta');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-b-4 border-green-500 flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={recipe.image || '/placeholder-recipe.jpg'}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {recipe.title}
        </h3>

        <div className="flex gap-2 mb-4 flex-wrap">
          {recipe.usedIngredientCount !== undefined && (
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              {recipe.usedIngredientCount} ingredientes
            </span>
          )}
          {recipe.missedIngredientCount !== undefined && recipe.missedIngredientCount > 0 && (
            <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
              +{recipe.missedIngredientCount} más
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/receta/${recipe.id}`}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700 transition font-semibold"
          >
            Ver Receta
          </Link>

          {showSaveButton && (
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`px-4 py-2 rounded-lg transition font-semibold border-2 ${
                saved
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700'
              }`}
              title={saved ? 'Guardada' : 'Guardar receta'}
            >
              {saved ? '✓' : saving ? '...' : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
