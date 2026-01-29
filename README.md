# Eco-chef Frontend

Frontend de la aplicación Eco-chef, construida con **Next.js** y **TypeScript**.

## 🚀 Características

- **Autenticación segura** con JWT
- **Búsqueda de recetas** por ingredientes
- **Generación de recetas AI** integrada con Groq
- **Guardado de recetas favoritas**
- **Visualización detallada de recetas** con medidas e ingredientes
- **Interfaz responsiva** con Tailwind CSS
- **Context API** para manejo de estado

## 📋 Requisitos previos

- Node.js 18+ 
- npm o yarn

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Variables de entorno necesarias
# Crear archivo .env.local en la raíz del frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📦 Dependencias principales

- **next**: Framework React con SSR
- **typescript**: Tipado estático
- **tailwindcss**: Estilos CSS
- **react-hot-toast**: Notificaciones
- **jsonwebtoken**: Autenticación

## 🏃 Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Build para producción

```bash
npm run build
npm run start
```

## 📁 Estructura del proyecto

```
front/
├── app/                    # Rutas y páginas de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── buscar/            # Búsqueda de recetas
│   ├── receta/[id]/       # Detalle de receta
│   ├── mis-recetas/       # Recetas guardadas
│   └── todas-las-recetas/ # Todas las recetas
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx         # Barra de navegación
│   ├── RecipeCard.tsx     # Tarjeta de receta
│   ├── ProtectedRoute.tsx # Ruta protegida
│   └── ...
├── lib/                   # Funciones utilitarias
│   ├── api.ts            # Cliente HTTP
│   ├── authService.ts    # Servicios de autenticación
│   └── recipeService.ts  # Servicios de recetas
├── context/              # Context de React
│   └── AuthContext.tsx   # Contexto de autenticación
├── types/                # Tipos TypeScript
│   └── index.ts          # Tipos globales
└── globals.css           # Estilos globales
```

## 🔑 Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL del API backend |

## 🎨 Diseño

- **Framework CSS**: Tailwind CSS
- **Componentes responsivos** para mobile, tablet y desktop
- **Paleta de colores**: Verde (#059669) como color principal

## 🔐 Autenticación

La aplicación usa **JWT tokens** almacenados en localStorage:
- Token guardado como `auth_token`
- Renovación automática al iniciar sesión
- Rutas protegidas con `ProtectedRoute`

## 📝 Tipos principales

Ver [types/index.ts](types/index.ts) para ver todas las interfaces:
- `User`: Usuario autenticado
- `Recipe`: Información de receta
- `IngredientMeasure`: Medidas de ingredientes

## 📄 Licencia

© 2026 Eco-chef.