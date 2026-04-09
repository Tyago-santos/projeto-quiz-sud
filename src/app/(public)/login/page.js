"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase.config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/libs/helpers/validation/login";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProviderContext } from "@/app/layout";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [dispatch] = useContext(ProviderContext);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleValidadeSubmit = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log("Usuário logado:", user);
      if (user) {
        dispatch;
        ({
          type: "SET_NAME",
          payload: { name: data.name },
        });

        Cookies.set("firebaseToken", user.user.getIdToken(), { expires: 7 });

        // Redirecionar para a página principal ou dashboard
        router.replace("/", undefined, { shallow: true });
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div
        className="
        w-full max-w-md p-8 rounded-3xl 
        bg-white/80 backdrop-blur-xl
        border border-white/40 shadow-xl
      "
      >
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo Quiz SUD"
            width={180}
            height={180}
            className="w-48 h-auto"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Bem-vindo 👋</h1>

        <p className="text-center text-sm text-slate-500 mb-6">
          Entre na sua conta para continuar
        </p>

        <form
          onSubmit={handleSubmit(handleValidadeSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="seu@email.com"
              className="
                p-3 rounded-xl border border-slate-200 
                focus:border-accent focus:ring-2 focus:ring-accent/20
                outline-none transition-all
              "
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Senha */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">Senha</label>
            <div className="flex border border-slate-200 rounded-xl focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="
                  flex-1 p-3 rounded-l-xl 
                  outline-none transition-all
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  p-3 rounded-r-xl 
                  bg-slate-50 hover:bg-slate-100 focus:bg-slate-100
                  outline-none transition-all
                "
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5 text-slate-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-slate-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          {/* Botão */}
          <button
            className="
              mt-2 p-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-accent to-secondary
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200 shadow-md
            "
          >
            Entrar
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">ou</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Social login (opcional visual) */}
        <button
          className="
          w-full p-3 rounded-xl border border-slate-200
          hover:bg-slate-50 transition-all
        "
        >
          Continuar com Google
        </button>

        <p className="text-sm text-center mt-6 text-slate-500">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="text-accent font-semibold hover:underline"
          >
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
