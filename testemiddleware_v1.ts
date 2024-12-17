// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // Captura o segmento extra da URL
  const pathSegments = url.pathname.split('/').filter(Boolean);
  // console.log("url2: ", req);

  let extraSegment = '';
  let remainingPath = '';

  // Verifica se o primeiro segmento não pertence às rotas conhecidas
  if (pathSegments.length > 0 && !['pages'].includes(pathSegments[0])) {
    extraSegment = pathSegments.shift()!;
    remainingPath = pathSegments.join('/');

    let newurl = '/' + remainingPath;

    // Redireciona para a URL correta e adiciona o cabeçalho com o segmento extra
    const response = NextResponse.rewrite(new URL(newurl, req.url))
    response.headers.set('extra-segment', extraSegment);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
