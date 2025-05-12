import { NextResponse, type NextRequest } from "next/server";
import {
  PUBLIC_ROUTES,
  REDIRECT_WHEN_AUTHENTICATED,
  REDIRECT_WHEN_NOT_AUTHENTICATED,
} from "@/lib/authRoutes";

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

function isBypassEnabled(): boolean {
  const bypassAuth = process.env.BYPASS_AUTH?.toLowerCase() === 'true';
  const isDev = process.env.NODE_ENV === 'development';
  
  console.log(`🛠️ Bypass conditions - BYPASS_AUTH: ${process.env.BYPASS_AUTH}, NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`🛠️ Parsed values - bypassAuth: ${bypassAuth}, isDev: ${isDev}`);
  
  return bypassAuth && isDev;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;

  console.log("\n➡️ Middleware executado");
  console.log("📍 Rota:", pathname);
  console.log("🔑 Token:", authToken ?? "nenhum");
  console.log("🛠️ Variáveis de ambiente:", {
    BYPASS_AUTH: process.env.BYPASS_AUTH,
    NODE_ENV: process.env.NODE_ENV
  });

  const bypass = isBypassEnabled();
  console.log("🔓 Bypass ativado?", bypass);

  if (bypass) {
    console.log("🔓 Acesso concedido via bypass");
    return NextResponse.next();
  }

  const isPublic = isPublicRoute(pathname);
  const isAuthenticated = Boolean(authToken);

  console.log("🔍 Status da rota:", {
    isPublic,
    isAuthenticated
  });

  if (!isAuthenticated && !isPublic) {
    console.log("🔒 Redirecionando para login (não autenticado)");
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && isPublic) {
    console.log("🔒 Redirecionando para dashboard (já autenticado)");
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  console.log("🟢 Acesso permitido");
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp)$).*)',
  ],
};