import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>

        {/* Subtitle */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Página não encontrada
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8">
          Desculpe! A página que você está procurando não existe.
        </p>

        {/* CTA Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-2xl transition-colors duration-300"
        >
          <FiHome className="w-5 h-5" />
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
