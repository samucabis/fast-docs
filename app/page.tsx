'use client'
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-column  h-full w-full">
      <div className="flex justify-content-center">
        <h1>Bem-vindo à aplicação de geração de documetos!</h1>
      </div>
      <div className="flex w-full justify-content-center h-full align-content-center">
      <Card className="flex justify-content-center mb-8 align-self-center text-center" title="Login">
        <div className="flex flex-column gap-4">
          <InputText placeholder="Usuário" />
          <Password  placeholder="Senha" />
        </div> 
        <div className="flex-column flex gap-2">

          <label className="mt-1 flex align-self-end justify-content-end hover-underline">Esqueceu a senha?</label>
          <Button className="mt-2 w-full" label="Entrar" onClick={() => {router.push('/upload')}} />
        </div>
      </Card>
      </div>
      {/* <p>Vá para a página de upload para gerar seu <a href="/upload">PDF</a>.</p> */}
    </div>
  );
}