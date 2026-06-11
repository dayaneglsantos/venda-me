import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FiCamera } from "react-icons/fi";
import { FormField } from "./FormField";
import SelectInput from "./SelectInput";
import Button from "./Button";
import Avatar from "./Avatar";
import { useAuthStore } from "../store/authStore";
import { createUser, updateUser } from "../services/users";
import { compressImage } from "../utils/compressImage";
import toast from "react-hot-toast";
import type { UserType } from "../types/userType";

const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

interface UserFormProps {
  mode: "create" | "edit";
  user?: UserType;
  onSuccess: () => void;
}

const userFormSchema = (mode: "create" | "edit") =>
  zod
    .object({
      name: zod.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
      email: zod.string().email("E-mail inválido"),
      password:
        mode === "create"
          ? zod.string().min(6, "A senha deve conter no mínimo 6 caracteres")
          : zod.string().optional(),
      confirmPassword:
        mode === "create" ? zod.string() : zod.string().optional(),
      phone: zod.string().min(1, "Campo obrigatório"),
      state: zod.string().min(1, "Campo obrigatório"),
      city: zod.string().min(1, "Campo obrigatório"),
    })
    .refine(
      (data) => mode === "edit" || data.password === data.confirmPassword,
      {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      },
    );

type UserFormData = {
  name: string;
  email: string;
  password: string | undefined;
  confirmPassword: string | undefined;
  phone: string;
  state: string;
  city: string;
};

export default function UserForm({ mode, user, onSuccess }: UserFormProps) {
  const { login, updateUser: updateAuthUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    user?.avatar,
  );

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema(mode)),
    defaultValues:
      mode === "edit" && user
        ? {
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
            state: user.state ?? "",
            city: user.city ?? "",
            password: "",
            confirmPassword: "",
          }
        : {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            state: "",
            city: "",
          },
  });

  const formValues = watch();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setAvatarPreview(compressed);
    } catch {
      toast.error("Erro ao processar a imagem.");
    }
    e.target.value = "";
  };

  const handleSubmitForm = async (data: UserFormData) => {
    if (mode === "create") {
      const response = await createUser({
        name: data.name,
        email: data.email,
        password: data.password!,
        phone: data.phone,
        state: data.state,
        city: data.city,
        avatar: avatarPreview,
      });
      if (response?.error) {
        toast.error(response.error);
        return;
      }
      if (response?.data) {
        login(response.data);
        toast.success("Cadastro realizado com sucesso!");
        onSuccess();
      }
    } else if (mode === "edit" && user) {
      const response = await updateUser(user.id, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        state: data.state,
        city: data.city,
        avatar: avatarPreview,
      });
      if (response?.error) {
        toast.error(response.error);
        return;
      }
      if (response?.data) {
        updateAuthUser(response.data);
        toast.success("Cadastro atualizado com sucesso!");
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col">
      <div className="flex justify-center mb-4">
        <div
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar src={avatarPreview} alt="Foto de perfil" size="lg" />
          <div className="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
            <FiCamera className="text-white" size={18} />
            <span className="text-white text-xs font-semibold leading-tight">
              Trocar foto
            </span>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      <FormField
        label="Nome completo"
        placeholder="Digite seu nome completo"
        value={formValues.name}
        onChange={(value) => setValue("name", value)}
        error={errors.name?.message}
      />
      <FormField
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        value={formValues.email}
        onChange={(value) => setValue("email", value)}
        error={errors.email?.message}
      />
      <FormField
        label="Telefone"
        placeholder="(00) 00000-0000"
        value={formValues.phone ?? ""}
        onChange={(value) => setValue("phone", value)}
        maskOptions={{ mask: "(00) 00000-0000" }}
        error={errors.phone?.message}
      />
      <div className="flex gap-3 mt-2">
        <SelectInput
          label="Estado"
          placeholder="Selecione..."
          options={BRAZILIAN_STATES}
          value={formValues.state ?? ""}
          onChange={(value) => setValue("state", value)}
          className="w-36"
          error={errors.state?.message}
        />
        <FormField
          label="Cidade"
          placeholder="Digite sua cidade"
          value={formValues.city ?? ""}
          onChange={(value) => setValue("city", value)}
          className="flex-1"
          error={errors.city?.message}
        />
      </div>
      {mode === "create" && (
        <>
          <FormField
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={formValues.password ?? ""}
            onChange={(value) => setValue("password", value)}
            error={errors.password?.message}
          />
          <FormField
            label="Confirmar senha"
            type="password"
            placeholder="Confirme sua senha"
            value={formValues.confirmPassword ?? ""}
            onChange={(value) => setValue("confirmPassword", value)}
            error={errors.confirmPassword?.message}
          />
        </>
      )}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full mt-6"
      >
        {mode === "create" ? "Cadastrar" : "Salvar alterações"}
      </Button>
    </form>
  );
}
