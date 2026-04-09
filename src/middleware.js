import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("firebaseToken")?.value;
  const { pathname } = request.nextUrl;

  // Defina exatamente as páginas de autenticação
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Se NÃO tem token e NÃO está na página de login/register, manda para o login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se JÁ TEM token e está tentando acessar login/register, manda para a home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // O matcher deve excluir arquivos estáticos (imagens, favicon, etc) para não travar o site
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
