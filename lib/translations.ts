// Diccionario de ingredientes español-inglés para búsqueda
export const ingredientTranslations: { [key: string]: string } = {
  tomate: 'tomato', tomates: 'tomatoes', cebolla: 'onion', cebollas: 'onions',
  ajo: 'garlic', zanahoria: 'carrot', zanahorias: 'carrots', patata: 'potato',
  patatas: 'potatoes', papa: 'potato', papas: 'potatoes', lechuga: 'lettuce',
  espinaca: 'spinach', espinacas: 'spinach', brócoli: 'broccoli', coliflor: 'cauliflower',
  pimiento: 'bell pepper', pimientos: 'bell peppers', aguacate: 'avocado', aguacates: 'avocados',
  pepino: 'cucumber', pepinos: 'cucumbers', champiñón: 'mushroom', champiñones: 'mushrooms',
  choclo: 'corn', maíz: 'corn', manzana: 'apple', manzanas: 'apples', plátano: 'banana',
  plátanos: 'bananas', naranja: 'orange', naranjas: 'oranges', limón: 'lemon', limones: 'lemons',
  lima: 'lime', limas: 'limes', fresa: 'strawberry', fresas: 'strawberries', uva: 'grape',
  uvas: 'grapes', piña: 'pineapple', piñas: 'pineapples', melocotón: 'peach', melocotones: 'peaches',
  pera: 'pear', peras: 'pears', pollo: 'chicken', carne: 'beef', res: 'beef', cerdo: 'pork',
  pescado: 'fish', salmón: 'salmon', trucha: 'trout', atún: 'tuna', camarón: 'shrimp',
  camarones: 'shrimp', huevo: 'egg', huevos: 'eggs', leche: 'milk', queso: 'cheese',
  yogur: 'yogurt', mantequilla: 'butter', arroz: 'rice', pan: 'bread', harina: 'flour',
  pasta: 'pasta', avena: 'oats', sal: 'salt', pimienta: 'pepper', azúcar: 'sugar',
  aceite: 'oil', vinagre: 'vinegar', mostaza: 'mustard', salsa: 'sauce', agua: 'water',
  vino: 'wine', cerveza: 'beer',
};

export function translateIngredientsToEnglish(ingredients: string[]): string[] {
  return ingredients.map((ingredient) => {
    const lower = ingredient.toLowerCase().trim();
    return ingredientTranslations[lower] || lower;
  });
}

// Cache para evitar traducir lo mismo varias veces
const translationCache: { [key: string]: string } = {};

/**
 * Traduce texto usando MyMemory API (gratuita y sin autenticación)
 * @param text Texto a traducir
 * @param fromLang Código de idioma origen (ej: 'en')
 * @param toLang Código de idioma destino (ej: 'es')
 * @returns Texto traducido
 */
export async function translateWithMyMemory(
  text: string,
  fromLang: string = 'en',
  toLang: string = 'es'
): Promise<string> {
  if (!text || text.length === 0) return text;

  try {
    // Crear un hash simple para la cache (primeros 100 caracteres + idiomas)
    const hashKey = `${fromLang}-${toLang}-${text.substring(0, 100)}`;
    if (translationCache[hashKey]) {
      console.log('Usando traducción en cache');
      return translationCache[hashKey];
    }

    console.log(`Traduciendo desde ${fromLang} a ${toLang}:`, text.substring(0, 50));
    
    // Usar MyMemory Translated API (gratuita, sin autenticación)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`,
      { 
        signal: AbortSignal.timeout(10000) // timeout de 10 segundos para textos largos
      }
    );
    
    if (!response.ok) {
      console.warn('Error en respuesta de MyMemory:', response.status);
      return text;
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      translationCache[hashKey] = translated;
      console.log('Traducción exitosa');
      return translated;
    } else {
      console.warn('MyMemory no devolvió traducción válida');
      return text;
    }
  } catch (error) {
    console.error('Error en traducción:', error);
    return text;
  }
}

// Funciones que serán actualizadas para usar la API
export function translateRecipeTitle(title: string): string {
  return title;
}

export function translateInstructions(text: string): string {
  return text;
}
