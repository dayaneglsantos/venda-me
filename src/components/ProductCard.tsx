import { useNavigate } from "react-router-dom";
import type { ProductType } from "../types/productType";
import Button from "./Button";
import dayjs from "dayjs";
import Badge from "./Badge";
import { useAuthStore } from "../store/authStore";
import { FiMoreVertical } from "react-icons/fi";
import Dropdown, {
  DropdownButton,
  DropdownContent,
  DropdownHeader,
  DropdownItem,
} from "./Dropdown";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isMyProduct = user && product.userId === user.id;

  return (
    <div className="flex flex-col justify-between shadow-md rounded-lg p-3 bg-white relative">
      <Dropdown align="right">
        <DropdownButton className="absolute -top-2 -right-2 z-50">
          <FiMoreVertical className="text-3xl bg-gray-200 border border-primary-light p-1 rounded-2xl text-gray-500 cursor-pointer" />
        </DropdownButton>

        <DropdownContent>
          <DropdownItem onClick={() => {}}>Editar</DropdownItem>

          <DropdownItem onClick={() => {}} variant="danger">
            Excluir
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
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
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </p>
          <span className="text-xs p-1 px-1.5 bg-gray-100 text-primary-dark rounded-2xl border border-primary-lighter">
            {product.condition === "novo" ? "Novo" : "Usado"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        {isMyProduct && (
          <Badge
            variant={
              product?.status === "available"
                ? "success"
                : product?.status === "paused"
                  ? "warning"
                  : "info"
            }
          >
            {product?.status === "available"
              ? "Ativo"
              : product?.status === "paused"
                ? "Pausado"
                : "Vendido"}
          </Badge>
        )}
        <p className="text-sm text-gray-500 mb-2">
          {dayjs(product.createdAt).format("DD/MM/YYYY HH:mm")}
        </p>
      </div>
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
