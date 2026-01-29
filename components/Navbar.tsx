'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg border-b-4 border-green-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:text-green-100 transition">
          Eco-Chef
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            <Link
              href="/buscar"
              className={`hover:text-green-200 transition ${
                pathname === '/buscar' ? 'font-bold underline' : ''
              }`}
            >
              Buscar Recetas
            </Link>
            <Link
              href="/mis-recetas"
              className={`hover:text-green-200 transition ${
                pathname === '/mis-recetas' ? 'font-bold underline' : ''
              }`}
            >
              Mis Recetas
            </Link>
            <Link
              href="/todas-las-recetas"
              className={`hover:text-green-200 transition ${
                pathname === '/todas-las-recetas' ? 'font-bold underline' : ''
              }`}
            >
              Todas las Recetas
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm hidden sm:inline">{user?.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
              >
                Salir
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/login"
              className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition font-medium"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-800 transition font-medium"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
