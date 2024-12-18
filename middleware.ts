import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let host = req.headers.get('host') || '';

  // Remove a porta, se existir
  host = host.split(':')[0];

  const allowedDomains = ["teste"];
  
  // Verifica se o hostname atual está na lista de domínios permitidos
  const isMainDomain = allowedDomains.includes(host.split('.')[0]);

  if (!isMainDomain) {
    // Reescreve para uma página específica para domínios principais
    url.pathname = '/pages/page2';
    return NextResponse.rewrite(url);
  }

  const subdomain = isMainDomain ? host.split('.')[0] : null;

  if (subdomain) {
    // Reescreve a URL para uma rota dinâmica com base no subdomínio
    url.pathname = '/' + url.pathname.split('/').filter(Boolean).join('/');
    const response = NextResponse.rewrite(url);
    response.headers.set('extra-segment', subdomain);
    return response;
  }

  // Redirecionamento padrão para subdomínios ou domínios inválidos
  url.pathname = '/pages/page2';
  return NextResponse.rewrite(url);
}
