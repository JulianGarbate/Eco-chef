import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Eco-Chef
          </h1>
          <p className="text-2xl text-green-700 font-semibold mb-8">
            Transforma ingredientes en deliciosas recetas
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Ingresa los ingredientes que tienes en casa y descubre recetas increíbles.
            <br />
            Reduce el desperdicio de comida y ahorra dinero.
          </p>

          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            <Link
              href="/buscar"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-lg"
            >
              Comenzar a Cocinar →
            </Link>
            <Link
              href="/register"
              className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-l-4 border-green-600">
            <div className="text-3xl mb-4 font-bold text-green-600">1</div>
            <h3 className="text-xl font-semibold mb-2">Busca Recetas</h3>
            <p className="text-gray-600">
              Ingresa tus ingredientes y encuentra recetas perfectas
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-l-4 border-red-600">
            <div className="text-3xl mb-4 font-bold text-red-600">2</div>
            <h3 className="text-xl font-semibold mb-2">Guarda Favoritas</h3>
            <p className="text-gray-600">
              Crea tu colección personal de recetas
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-l-4 border-blue-600">
            <div className="text-3xl mb-4 font-bold text-blue-600">3</div>
            <h3 className="text-xl font-semibold mb-2">Cuida el Planeta</h3>
            <p className="text-gray-600">
              Reduce el desperdicio de alimentos
            </p>
          </div>
        </div>

        <div className="mt-16 bg-green-50 p-8 rounded-lg border-t-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h4 className="font-semibold mb-2">Ingresa ingredientes</h4>
              <p className="text-sm text-gray-600">
                Escribe al menos 3 ingredientes que tengas disponibles
              </p>
            </div>
            <div>
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h4 className="font-semibold mb-2">Descubre recetas</h4>
              <p className="text-sm text-gray-600">
                Encuentra las mejores recetas para ti
              </p>
            </div>
            <div>
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h4 className="font-semibold mb-2">Cocina y guarda</h4>
              <p className="text-sm text-gray-600">
                Sigue las instrucciones y guarda tus favoritas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
