# 🥗 Eco-Chef Frontend

Frontend de Eco-Chef desarrollado con Next.js 14, TypeScript y Tailwind CSS.

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Backend de Eco-Chef corriendo en `http://localhost:4000`
- API Key de Spoonacular

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Edita el archivo `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SPOONACULAR_API_KEY=tu_api_key_aqui
```

**Obtener API Key de Spoonacular:**
1. Regístrate en: https://spoonacular.com/food-api
2. Copia tu API Key del dashboard
3. Pégala en `.env.local`

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## 📁 Estructura del Proyecto

```
eco-chef-frontend/
├── app/                    # Páginas de Next.js (App Router)
│   ├── page.tsx           # Página de inicio
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── buscar/            # Búsqueda de recetas
│   ├── mis-recetas/       # Recetas guardadas
│   └── receta/[id]/       # Detalle de receta
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── RecipeCard.tsx
│   ├── IngredientInput.tsx
│   └── ProtectedRoute.tsx
├── context/               # Contextos de React
│   └── AuthContext.tsx
├── lib/                   # Servicios y utilidades
│   ├── api.ts
│   ├── authService.ts
│   └── recipeService.ts
└── types/                 # Tipos de TypeScript
    └── index.ts
```

## 🎯 Funcionalidades

### ✅ Autenticación
- Registro de usuarios
- Login con email y contraseña
- Sesión persistente con cookies
- Protección de rutas privadas

### 🔍 Búsqueda de Recetas
- Buscar recetas por ingredientes (mínimo 3)
- Resultados de la API de Spoonacular
- Hasta 5 recetas por búsqueda

### ❤️ Gestión de Favoritos
- Guardar recetas favoritas
- Ver todas las recetas guardadas
- Eliminar recetas de favoritos

### 📖 Detalle de Receta
- Ver ingredientes completos
- Instrucciones paso a paso
- Tiempo de preparación
- Número de porciones

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## 🌐 Rutas de la Aplicación

- `/` - Página de inicio
- `/login` - Iniciar sesión
- `/register` - Registrarse
- `/buscar` - Buscar recetas (requiere auth)
- `/mis-recetas` - Recetas guardadas (requiere auth)
- `/receta/[id]` - Detalle de receta (requiere auth)

## 🔐 Autenticación

El sistema de autenticación utiliza:
- JWT tokens almacenados en cookies
- Expiración de 1 día
- Interceptor de Axios para agregar token automáticamente
- Redirección automática a login si el token expira

## 🎨 Estilos

- **Tailwind CSS** para todos los estilos
- Diseño responsive (mobile-first)
- Paleta de colores verde (tema eco-friendly)
- Componentes con hover effects y transiciones

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (< 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🐛 Solución de Problemas

### Error: "Cannot connect to API"
- Verifica que el backend esté corriendo en `http://localhost:4000`
- Revisa que el archivo `.env.local` tenga la URL correcta

### Error: "Spoonacular API Error"
- Verifica tu API Key de Spoonacular
- Revisa que no hayas excedido el límite de peticiones (150/día gratis)

### Las imágenes no cargan
- Verifica que `next.config.js` tenga configurado los dominios de Spoonacular
- Revisa la consola del navegador para errores

## 🚀 Deploy en Producción

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Variables de entorno en Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - `NEXT_PUBLIC_API_URL` (URL de tu backend en producción)
   - `NEXT_PUBLIC_SPOONACULAR_API_KEY`

## 📚 Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **js-cookie** - Manejo de cookies
- **Spoonacular API** - API de recetas

## 👨‍💻 Desarrollo

### Agregar una nueva página

1. Crear carpeta en `app/nombre-pagina/`
2. Crear `page.tsx` dentro de la carpeta
3. Exportar componente por defecto

### Agregar un nuevo componente

1. Crear archivo en `components/NombreComponente.tsx`
2. Usar `'use client'` si necesita interactividad
3. Importar donde lo necesites

### Agregar un nuevo servicio

1. Crear archivo en `lib/nombreService.ts`
2. Importar `api` de `lib/api.ts`
3. Exportar funciones async

## 📄 Licencia

MIT

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas, abre un issue en GitHub.

---

Hecho con ❤️ y Next.js
