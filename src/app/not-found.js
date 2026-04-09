"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-text font-sans flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white border-2 border-secondary/50 rounded-3xl shadow-xl overflow-hidden text-center p-8 flex flex-col items-center">
        {/* Ícone de Alerta com estilo das categorias */}
        <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 border-accent/20">
          <svg
            xmlns="http://w3.org"
            className="h-10 w-10 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-7xl font-black text-text/20 mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-4">Caminho não encontrado</h2>

        <p className="text-text/70 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida para outra
          categoria.
        </p>

        <Link href="/" className="w-full">
          <button className="w-full py-4 bg-primary text-text rounded-xl font-bold text-lg shadow-lg hover:brightness-105 active:scale-95 transition-all duration-300 hover:shadow-primary/40">
            VOLTAR AO INÍCIO
          </button>
        </Link>

        {/* Detalhe sutil de estilo */}
        <div className="mt-8 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
          <div className="w-2 h-2 rounded-full bg-accent/40"></div>
          <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
        </div>
      </div>
    </div>
  );
}
