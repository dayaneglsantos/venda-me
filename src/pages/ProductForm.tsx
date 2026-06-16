import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Componentes internos
import { FormField } from "../components/FormField";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";

// Componentes do Dnd-Kit para o Drag and Drop das fotos
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SelectInput from "../components/SelectInput";
import { compressImage } from "../utils/compressImage";
import SortableItem from "../components/SortableItem";
import { createProduct, getProduct, updateProduct } from "../services/products";
import type { ProductType } from "../types/productType";
import { FiAlertCircle } from "react-icons/fi";

export default function ProductForm() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  // Estado local para controlar o input temporário de adicionar imagem
  const [tempImageUrl, setTempImageUrl] = useState("");

  const productSchema = zod.object({
    title: zod.string().min(3, "O título deve conter no mínimo 3 caracteres"),
    price: zod.number().min(1, "Campo obrigatório"),
    description: zod.string().optional(),
    brand: zod.string().optional(),
    categoryId: zod.string().optional().nullable(),
    condition: zod.enum(["novo", "usado"]),
    shipping: zod.boolean(),
    images: zod
      .array(zod.object({ id: zod.string(), url: zod.string() }))
      .min(1, "Adicione pelo menos uma imagem"),
  });

  type ProductFormData = zod.infer<typeof productSchema>;

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      brand: "",
      categoryId: null,
      condition: "usado",
      shipping: false,
      images: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
    reset,
  } = methods;

  const formValues = watch();

  const handleAddImageUrl = () => {
    if (!tempImageUrl.trim()) return;
    const currentImages = formValues.images || [];
    setValue(
      "images",
      [...currentImages, { id: crypto.randomUUID(), url: tempImageUrl.trim() }],
      {
        shouldValidate: true,
      },
    );
    setTempImageUrl("");
  };

  // Upload e conversão do arquivo local para Base64
  const handleLocalFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    try {
      const compressedBase64 = await compressImage(file);
      const currentImages = formValues.images || [];

      setValue(
        "images",
        [...currentImages, { id: crypto.randomUUID(), url: compressedBase64 }],
        {
          shouldValidate: true,
        },
      );
    } catch (error) {
      toast.error("Erro ao processar a imagem do computador.");
    }
  };

  // Remove uma imagem da lista
  const handleRemoveImage = (indexToRemove: number) => {
    const filteredImages = formValues.images.filter(
      (_, index) => index !== indexToRemove,
    );
    setValue("images", filteredImages, { shouldValidate: true });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = formValues.images.findIndex((img) => img.id === active.id);

    const newIndex = formValues.images.findIndex((img) => img.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    setValue("images", arrayMove(formValues.images, oldIndex, newIndex), {
      shouldValidate: true,
    });
  };

  const handleRegisterProduct = async () => {
    if (isSubmitting) return;

    try {
      const payload = {
        id: crypto.randomUUID(),
        userId: user?.id,
        title: formValues.title,
        price: formValues.price,
        description: formValues.description,
        images: formValues.images,
        brand: formValues.brand,
        categoryId: formValues.categoryId,
        condition: formValues.condition,
        shipping: formValues.shipping,
        createdAt: new Date().toISOString(),
        status: "available",
      };

      if (product) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }

      toast.success(
        `Anúncio ${product ? "atualizado" : "criado"} com sucesso!`,
      );
      navigate("/meus-anuncios");
    } catch (error) {
      toast.error(
        `Ocorreu um erro ao ${product ? "atualizar" : "criar"} o anúncio.`,
      );
    }
  };

  const getProductData = async (productId: string) => {
    try {
      const { data, error } = await getProduct(productId);
      if (data) {
        setProduct(data);
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar os dados do produto.");
    }
  };

  useEffect(() => {
    if (id) {
      getProductData(id);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        price: product.price,
        description: product.description || "",
        brand: product.brand || "",
        categoryId: product.categoryId || null,
        condition: product.condition,
        shipping: product.shipping,
        images: product.images,
      });
    }
  }, [product, reset]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleRegisterProduct)}
        className="max-w-2xl w-full mx-auto p-6 bg-white rounded-xl shadow flex flex-col"
      >
        <h1 className="text-xl font-bold text-primary-dark mb-6 text-center">
          {product ? "Editar" : "Criar"} Anúncio
        </h1>

        <FormField
          label="Título do Produto"
          value={formValues.title}
          onChange={(value) => setValue("title", value)}
          placeholder="Ex: iPhone 15 Pro Max 256GB"
          error={errors.title?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Preço"
            value={String(formValues.price)}
            onChange={(value) => {
              setValue("price", Number(value));
            }}
            onFocus={!product ? (e) => e.target.select() : undefined}
            maskOptions={{
              mask: Number,
              scale: 2,
              signed: false,
              thousandsSeparator: ".",
              radix: ",",
              mapToRadix: ["."],
              normalizeZeros: true,
              padFractionalZeros: true,
            }}
            error={errors.price?.message}
          />

          <FormField
            label="Marca"
            value={formValues.brand || ""}
            onChange={(value) => setValue("brand", value)}
            placeholder="Ex: Apple"
            error={errors.brand?.message}
          />
        </div>

        {/* Categoria */}
        <SelectInput
          label="Categoria"
          options={[
            { value: 1, label: "Automóveis" },
            { value: 2, label: "Eletrônicos" },
            { value: 3, label: "Moda" },
          ]}
          value={formValues.categoryId ? formValues.categoryId : ""}
          onChange={(value) => setValue("categoryId", value)}
        />

        {/* Descrição */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-500 text-sm font-bold mb-1">
            Descrição
          </label>
          <textarea
            value={formValues.description}
            onChange={(e) => setValue("description", e.target.value)}
            placeholder="Descreva os detalhes do seu produto..."
            rows={3}
            className="p-2 border border-primary rounded focus:outline-none"
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Upload de Imagens (Seção Híbrida) */}
        <div className="border border-dashed border-gray-400 p-4 rounded-lg mb-4 bg-gray-50">
          <label className="text-gray-700 text-sm font-bold mb-2 block">
            Fotos do anúncio
          </label>

          <div className="flex flex-col md:flex-row gap-2 mb-4">
            {/* Opção A: Inserir URL */}
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Cole a URL da imagem"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
                className="p-2 border border-gray-400 rounded flex-1 text-sm bg-white"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
              >
                Adicionar URL
              </button>
            </div>

            <div className="text-center flex items-center justify-center font-bold text-gray-400 px-2 text-xs">
              OU
            </div>

            {/* Opção B: Enviar Arquivo Local */}
            <label className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-bold cursor-pointer text-center flex items-center justify-center">
              Upload do Computador
              <input
                type="file"
                accept="image/*"
                onChange={handleLocalFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Container do Drag and Drop */}
          {formValues.images && formValues.images.length > 0 ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={formValues.images.map((img) => img.id)}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex flex-wrap gap-3 mt-2">
                  {formValues.images.map((img, index) => (
                    <SortableItem
                      key={img.id}
                      id={img.id}
                      onRemove={() => handleRemoveImage(index)}
                    >
                      <img
                        src={img.url}
                        alt="Miniatura"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">
              Nenhuma foto adicionada ainda. Adicione via URL ou Upload.
            </p>
          )}
          {errors.images && (
            <span className="text-red-500 text-sm block mt-2">
              {errors.images.message}
            </span>
          )}
        </div>

        {/* Condição e Frete */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm font-bold">Condição:</span>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                value="usado"
                checked={formValues.condition === "usado"}
                onChange={() => setValue("condition", "usado")}
              />{" "}
              Usado
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                value="novo"
                checked={formValues.condition === "novo"}
                onChange={() => setValue("condition", "novo")}
              />{" "}
              Novo
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={formValues.shipping}
              onChange={(e) => setValue("shipping", e.target.checked)}
              className="w-4 h-4"
            />
            Aceito enviar por transportadora
          </label>
        </div>

        {product && product.status !== "available" && (
          <p className="text-sm text-orange-400">
            <FiAlertCircle className="inline mr-1" />
            Ao salvar, o anuncio será atualizado e reativado.
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
          {product ? "Salvar Alterações" : "Publicar Anúncio"}
        </Button>
      </form>
    </div>
  );
}
