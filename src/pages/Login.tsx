import Button from "../components/Button";
import { FormField } from "../components/FormField";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useAuthStore } from "../store/authStore";
import { login as loginService } from "../services/login";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isLogged } = useAuthStore();
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const loginSchema = zod.object({
    email: zod.string().email("E-mail inválido"),
    password: zod.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  });

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = methods;

  const formValues = watch();

  const handleLogin = async () => {
    if (isSubmitting) return;

    try {
      const response = await loginService(
        formValues.email,
        formValues.password,
      );

      if (response?.data) {
        login(response.data);
        navigate("/");
      } else if (response?.error) {
        toast.error(response?.error);
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao realizar login");
      return;
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow w-full flex flex-col items-center justify-center"
      >
        <img src={logo} alt="Logo" className="h-24 mb-6 mx-auto" />
        <FormField
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          value={formValues.email}
          onChange={(value) => setValue("email", value)}
          error={errors.email?.message}
          className="mb-4"
        />
        <FormField
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={formValues.password}
          onChange={(value) => setValue("password", value)}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full m-6 mt-8"
        >
          Entrar
        </Button>
        <p className="text-sm text-gray-500 mb-2">
          Não tem uma conta?{" "}
          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className="text-primary hover:text-primary-dark underline font-medium cursor-pointer"
          >
            Cadastre-se
          </button>
        </p>
      </form>

      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Criar conta"
      >
        <UserForm mode="create" onSuccess={() => setIsRegisterOpen(false)} />
      </Modal>
    </div>
  );
}
