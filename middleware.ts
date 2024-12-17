import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Extrai o subdomínio da URL a partir do cabeçalho 'host'
  let host = req.headers.get('host')|| '';
  let subdomain = '';
  
  // Remove port if it exists 
  host = host.split(':')[0]

  if (url && (url.href.includes('http://localhost:3000/pages')) || (url.href.includes('http://localhost:3000/page'))) {
    const hostnameParts = host?.split('.') || [];

    // Verifica se o subdomínio é válido e não é 'localhost'
    if (hostnameParts.length == 2 && hostnameParts[0] !== 'localhost') {
      // Armazena o subdomínio e remove-o da URL
      subdomain = hostnameParts.shift()!;
      url.hostname = hostnameParts.join('.');

      // Define a nova URL sem o subdomínio
      url.pathname = '/' + url.pathname.split('/').filter(Boolean).join('/');

      // Redireciona para a URL correta e adiciona o cabeçalho com o subdomínio
      const response = NextResponse.rewrite(url);
      response.headers.set('extra-segment', subdomain);
      return response;
    }else {
      url.pathname = '/pages/page2';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}


