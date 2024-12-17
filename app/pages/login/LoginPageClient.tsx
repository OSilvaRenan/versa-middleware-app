"use client";

import { useState } from "react";
import Cookies from 'js-cookie';

const usuarioValido = [{ usuario: 'suporte', senha: '55@partner' }];

interface Props {
  dominio: string;
}
export default function LoginPageClient({dominio} :Props) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleRedirect() {
    const cookieLogin = Cookies.get('credenciais');
    const credentials = `${usuario}:${senha}`;
    // const headersList = await headers();
    // const dominio = headersList.get('extra-segment');

    const credencialValida = usuarioValido.some(user => user.usuario === usuario && user.senha === senha);

    // Verifica se o usuário é válido
    if (credencialValida) {
      if (cookieLogin) {
        const cookieData = JSON.parse(cookieLogin);

        if (cookieData.dominio !== dominio || cookieData.usuario !== usuario || atob(cookieData.senha) !== senha) {
          // Redireciona para 'login' se as credenciais no cookie forem diferentes das digitadas
          window.location.href = '/pages/login';
          return;
        }
      }

      const cookieCredenciais = {
        dominio: dominio!,
        usuario: usuario!,
        senha: btoa(senha!),
      };

      // Define as credenciais no cookie
      Cookies.set('credenciais', JSON.stringify(cookieCredenciais));

      // Redireciona para 'page1' se o usuário for válido
      window.location.href = '/pages/page1';
    } else {
      // Redireciona para 'login' se o usuário não for válido
      window.location.href = '/pages/login';
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
        <input
          type="text"
          id="txtUsuario"
          placeholder="Digite o usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4 text-black"
        />
        <input
          type="password"
          id="txtSenha"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4 text-black"
        />
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Logar
        </button>
      </div>
    </div>
  );
}
