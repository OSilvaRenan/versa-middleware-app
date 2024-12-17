"use client"
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo à Página Inicial</h1>
      <nav>
        <ul>
          <li>
            <Link href="/pages/page1">Página 1</Link>
          </li>
          <li>
            <Link href="/pages/page2">Página 2</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
