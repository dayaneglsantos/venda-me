import { useEffect, useState } from "react";
import Button from "../components/Button";
import { FormField } from "../components/FormField";
import KpiCard from "../components/KpiCard";
import SelectInput from "../components/SelectInput";
import { useAuthStore } from "../store/authStore";
import { categoriesList } from "../services/categories";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useAuthStore();
  const [filters, setFilters] = useState({
    title: "",
    state: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await categoriesList();
      const formatedCategories = data.map((category: any) => ({
        label: category.name,
        value: category.id,
      }));
      setCategories(formatedCategories);
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar as categorias");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <KpiCard title="Total de Anúncios" value="150" />
      <KpiCard title="Total de Vendas" value="90" />
      <KpiCard title="Anúncios Ativos" value="10" />
      <KpiCard title="Anúncios Pausados" value="3" />

      <div className="flex gap-3 mb-6 items-center">
        <FormField
          label="Pesquisar por título"
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, title: value }));
          }}
          value={filters.title}
        />
        <SelectInput
          options={[]}
          label="Filtrar por estado"
          value={filters.state}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, state: value }));
          }}
        />
        <SelectInput
          options={categories}
          label="Filtrar por categoria"
          value={filters.category}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, category: value }));
          }}
        />
      </div>
      <Button>Limpar Filtros</Button>
      {user && <Button>Criar Novo Anúncio</Button>}
    </div>
  );
}
