"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Page1() {
  const [dominio, setDominio] = useState('');
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    const cookieCredenciais = Cookies.get('credenciais');

    if (cookieCredenciais) {
      const credenciais = JSON.parse(cookieCredenciais);
      setDominio(credenciais.dominio);
      setUsuario(credenciais.usuario);
    }else {
      window.location.href = '/pages/login'
    }
  }, []);

  return (
    <div>
      <h1>{dominio && usuario ? `Bem-vindo, ${usuario} do domínio ${dominio}!` : 'Bem-vindo!'}</h1>
      <p>Esta é a página 1.</p>
    </div>
  );
}
