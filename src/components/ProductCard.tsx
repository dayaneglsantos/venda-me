import { useNavigate } from "react-router-dom";
import type { ProductType } from "../types/productType";
import Button from "./Button";
import dayjs from "dayjs";
import Badge from "./Badge";
import { useAuthStore } from "../store/authStore";
import {
  FiCheckCircle,
  FiEdit,
  FiMoreVertical,
  FiPauseCircle,
  FiPlayCircle,
  FiTrash,
} from "react-icons/fi";
import Dropdown, {
  DropdownButton,
  DropdownContent,
  DropdownItem,
} from "./Dropdown";
import toast from "react-hot-toast";
import { updateProduct } from "../services/products";
import { useState } from "react";

interface ProductCardProps {
  product: ProductType;
  handleDelete?: (id: string) => void;
}

export default function ProductCard({
  product: receivedProduct,
  handleDelete,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [product, setProduct] = useState<ProductType>(receivedProduct);

  const isMyProduct = user && product.userId === user.id;

  const handleChangeStatus = async (status: string) => {
    try {
      const { data } = await updateProduct(product.id, { ...product, status });
      toast.success("Status do produto atualizado com sucesso");
      setProduct(data);
    } catch (error) {
      toast.error("Ocorreu um erro ao alterar o status do produto");
    }
  };

  return (
    <div className="flex flex-col justify-between shadow-md rounded-lg p-3 bg-white relative">
      {isMyProduct && (
        <Dropdown align="right">
          <DropdownButton className="absolute -top-2 -right-2 z-50">
            <FiMoreVertical className="text-2xl bg-primary-lighter light p-0.5 rounded-2xl text-gray-500 cursor-pointer" />
          </DropdownButton>

          <DropdownContent>
            <DropdownItem
              onClick={() => navigate(`/anuncio/${product.id}/editar`)}
            >
              <FiEdit className="inline mr-1" />
              Editar
            </DropdownItem>
            {product.status !== "sold" && (
              <DropdownItem onClick={() => handleChangeStatus("sold")}>
                <FiCheckCircle className="inline mr-1" />
                Marcar como Vendido
              </DropdownItem>
            )}
            {product.status === "available" && (
              <DropdownItem onClick={() => handleChangeStatus("paused")}>
                <FiPauseCircle className="inline mr-1" />
                Pausar Anúncio
              </DropdownItem>
            )}
            {product.status === "paused" && (
              <DropdownItem onClick={() => handleChangeStatus("available")}>
                <FiPlayCircle className="inline mr-1" />
                Retomar Anúncio
              </DropdownItem>
            )}
            {handleDelete && (
              <DropdownItem
                onClick={() => handleDelete(product?.id)}
                variant="danger"
              >
                <FiTrash className="inline mr-1" />
                Excluir
              </DropdownItem>
            )}
          </DropdownContent>
        </Dropdown>
      )}
      <img
        src={product.images[0].url}
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
