import { useEffect, useState } from "react";
import Button from "../components/Button";
import { FormField } from "../components/FormField";
import KpiCard from "../components/KpiCard";
import SelectInput from "../components/SelectInput";
import { useAuthStore } from "../store/authStore";
import { categoriesList } from "../services/categories";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { myProductsMeta, productsList } from "../services/products";

export default function Home() {
  const { user } = useAuthStore();

  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    state: "",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
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

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await productsList(filters);
      setProducts(data.data);
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar os produtos");
    } finally {
      setIsLoading(false);
    }
  };

  const getMyProductsMeta = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data } = await myProductsMeta(user);
      setKpiData(data);
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar os produtos");
    } finally {
      setIsLoading(false);
    }
  };

  // debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getCategories();
    getMyProductsMeta();
  }, []);

  useEffect(() => {
    getProducts();
  }, [filters]);

  const statesList = [
    { label: "Todos os estados", value: "" },
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

  console.log(products);

  return (
    <div className="p-6 pt-3">
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
          options={statesList}
          label="Filtrar por estado"
          value={filters.state}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, state: value }));
          }}
          className="w-48"
        />
        <SelectInput
          options={categories}
          label="Filtrar por categoria"
          value={filters.category}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, category: value }));
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
              pageSize: 10,
              search: "",
              state: "",
              category: "",
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

      <div>
        {isLoading && <p>carregando....</p>}
        {!isLoading && products.length === 0 && (
          <p>Nenhum produto encontrado.</p>
        )}
        {!isLoading && products.length > 0 && (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
