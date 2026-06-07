import { useNavigate } from "react-router-dom";
import type { ProductType } from "../types/productType";
import Button from "./Button";
import dayjs from "dayjs";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between shadow-md rounded-lg p-3 bg-white">
      <img
        src={product.images[0]}
        alt="Produto"
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <div>
        <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {product.user?.city}, {product.user?.state}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-primary-dark font-bold text-xl mb-3">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
          <span className="text-xs p-1 px-1.5 bg-gray-100 text-primary-dark rounded-2xl border border-primary-lighter">
            {product.condition === "novo" ? "Novo" : "Usado"}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        {dayjs(product.createdAt).format("DD/MM/YYYY HH:mm")}
      </p>
      <Button
        className="w-full"
        size="sm"
        variant="outline"
        onClick={() => navigate(`/anuncio/${product.id}`)}
      >
        Ver Detalhes
      </Button>
    </div>
  );
}
