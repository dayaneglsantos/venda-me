import { api } from "./api";

export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.get("/users", {
      params: {
        email,
      },
    });
    const user = data[0];

    if (!user) {
      return { error: "E-mail não cadastrado. Verifique suas credenciais." };
    }

    if (user.password !== password) {
      return { error: "Senha incorreta" };
    }

    if (user.password === password) {
      return { data: user };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Ocorreu um erro ao realizar login",
    };
  }
};
