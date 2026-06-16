import { useEffect, useState } from "react";
import Button from "../components/Button";
import { FormField } from "../components/FormField";
import KpiCard from "../components/KpiCard";
import SelectInput from "../components/SelectInput";
import { useAuthStore } from "../store/authStore";
import { categoriesList } from "../services/categories";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import {
  deleteProduct,
  myProductsList,
  myProductsMeta,
} from "../services/products";
import EmptyContent from "../components/EmptyContent";
import Loader from "../components/Loader";
import type { ProductType } from "../types/productType";

export default function MyListings() {
  const { user } = useAuthStore();

  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 9,
    search: "",
    category: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState<any>({
    pages: 0,
    prev: false,
    next: false,
    totalPages: 0,
  });
  const [kpiData, setKpiData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    try {
      const { data } = await categoriesList();
      setCategories(data);
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar as categorias");
    }
  };

  const getMyProducts = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, meta } = await myProductsList(filters);
      setProducts(data.data);
      setMeta(meta ?? { prev: false, next: false, totalPages: 0, pages: 0 });
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar os produtos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await deleteProduct(id);
      if (!error) {
        toast.success("Produto excluído com sucesso!");
        setProducts((prev) =>
          prev.filter((prod: ProductType) => prod.id !== id),
        );
        getMyProductsMeta();
      } else {
        toast.error(error);
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Ocorreu um erro ao excluir o produto");
    }
  };

  const getMyProductsMeta = async () => {
    if (!user) return;
    try {
      const { data } = await myProductsMeta(user);
      setKpiData(data);
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar os produtos");
    }
  };

  // debounced search — retorna prev quando o valor não mudou para evitar re-render desnecessário
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => {
        if (prev.search === searchTerm) return prev;
        return { ...prev, search: searchTerm, pageNumber: 1 };
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getCategories();
    getMyProductsMeta();
  }, []);

  useEffect(() => {
    getMyProducts();
  }, [filters]);

  const categoriesOptions = categories?.map((cat: any) => ({
    label: cat.label,
    value: cat.id,
  }));

  const getVisiblePages = () => {
    const totalPages = meta.pages;
    const currentPage = filters.pageNumber;
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="p-6 pt-3 max-w-7xl mx-auto w-full flex flex-col flex-1">
      <div className="flex gap-3 mb-6 items-center">
        <FormField
          label="Pesquisar por título"
          onChange={(value) => {
            setSearchTerm(value);
          }}
          value={searchTerm}
          className="flex-1"
          placeholder="Buscar anúncio..."
        />
        <SelectInput
          options={categoriesOptions}
          label="Filtrar por categoria"
          value={filters.category}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, category: value }));
          }}
          className="w-48"
        />
        <SelectInput
          options={[
            { label: "Ativos", value: "available" },
            { label: "Pausados", value: "paused" },
            { label: "Vendidos", value: "sold" },
          ]}
          label="Status"
          value={filters.status}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, status: value }));
          }}
          className="w-48"
        />
        <Button
          size="sm"
          variant="outline"
          className="mt-7"
          onClick={() => {
            setSearchTerm("");
            setFilters({
              pageNumber: 1,
              pageSize: 9,
              search: "",
              category: "",
              status: "",
            });
          }}
        >
          Limpar Filtros
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {kpiData && (
          <>
            <KpiCard title="Total de Anúncios" value={kpiData.totalProducts} />
            <KpiCard title="Total de Vendas" value={kpiData.soldProducts} />
            <KpiCard title="Anúncios Ativos" value={kpiData.activeProducts} />
            <KpiCard title="Anúncios Pausados" value={kpiData.pausedProducts} />
          </>
        )}
      </div>

      <div className="flex-1">
        {isLoading && <Loader />}
        {!isLoading && products?.length === 0 && (
          <EmptyContent
            title="Nenhum anúncio encontrado"
            description="Tente ajustar os filtros ou buscar por outro termo."
            className="flex-1"
          />
        )}
        {!isLoading && products?.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {products?.map((product) => (
                <ProductCard
                  product={product}
                  handleDelete={handleDeleteProduct}
                />
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                size="sm"
                variant="outline"
                disabled={filters.pageNumber === 1}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    pageNumber: prev.pageNumber - 1,
                  }))
                }
              >
                Anterior
              </Button>

              {visiblePages.map((page) => (
                <Button
                  key={page}
                  size="sm"
                  variant={page === filters.pageNumber ? "primary" : "outline"}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      pageNumber: page,
                    }))
                  }
                >
                  {page}
                </Button>
              ))}

              <Button
                size="sm"
                variant="outline"
                disabled={filters.pageNumber === meta.pages}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    pageNumber: prev.pageNumber + 1,
                  }))
                }
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
