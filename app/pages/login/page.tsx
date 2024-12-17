
import { headers } from "next/headers";
import LoginPageClient from "./LoginPageClient";

export default async function LoginPage() {
  const headersList = await headers();
  const dominio = headersList.get('extra-segment');

  return (
    <div>
      <LoginPageClient dominio={dominio!} />
    </div>
  );
}
