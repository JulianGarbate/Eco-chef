'use client';

import { useState } from 'react';

interface IngredientInputProps {
  onSearch: (ingredients: string[]) => void;
  isLoading?: boolean;
}

export default function IngredientInput({ onSearch, isLoading = false }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<string[]>(['', '', '']);
  const [error, setError] = useState('');

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
    setError('');
  };

  const addIngredient = () => {
    if (ingredients.length < 10) {
      setIngredients([...ingredients, '']);
    }
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 3) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleSearch = () => {
    const filledIngredients = ingredients.filter((ing) => ing.trim() !== '');

    if (filledIngredients.length < 3) {
      setError('Debes ingresar al menos 3 ingredientes');
      return;
    }

    onSearch(filledIngredients);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-green-50 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border-2 border-green-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Busca recetas con tus ingredientes
      </h2>
      <p className="text-gray-600 text-center mb-2">
        Ingresa los ingredientes en español que tengas en casa
      </p>
      <p className="text-sm text-green-600 text-center mb-6 font-semibold">
        Ejemplo: tomate, cebolla, pollo, pasta...
      </p>

      <div className="space-y-3 mb-4">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ingrediente ${index + 1} ${index < 3 ? '(obligatorio)' : '(opcional)'}`}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              disabled={isLoading}
            />
            {ingredients.length > 3 && (
              <button
                onClick={() => removeIngredient(index)}
                className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                disabled={isLoading}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center mb-4 bg-red-50 px-4 py-3 rounded-lg font-semibold border-l-4 border-red-600">{error}</p>
      )}

      <div className="flex gap-3">
        {ingredients.length < 10 && (
          <button
            onClick={addIngredient}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
            disabled={isLoading}
          >
            + Agregar ingrediente
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400 text-lg"
        >
          {isLoading ? 'Buscando...' : 'Buscar Recetas'}
        </button>
      </div>
    </div>
  );
}
