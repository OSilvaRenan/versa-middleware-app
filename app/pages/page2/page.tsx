"use client";

import { useState } from "react";


export default function Page2() {
  const [text, setText] = useState("");

  function handleRedirect() {

    const currentHost = window.location.host; // Inclui hostname e porta 
    const currentPath = window.location.pathname; // Caminho da URL     


    if (text && currentHost && currentPath) {
      const newUrl = `http://${text}.${currentHost}${currentPath}`;
      window.location.href = newUrl;
    } else {
      alert("Por favor, preencha o campo de texto.");
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-black">Informe o domínio</h1>
        <input
          type="text"
          id="txtDominio"
          placeholder="Digite o subdomínio"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4 text-black"
        />
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
