import zod from "zod";

export const registerSchema = zod.object({
  email: zod.string().email("Endereço de email inválido"),
  password: zod.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  name: zod.string().min(2, "Nome precisa ter no mínimo 2 caracteres"),
});
