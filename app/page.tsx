import { SignInButton } from "@clerk/nextjs";
import { Metadata } from "next";
import { Button } from "./_components/ui/button";
import { LogInIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Stockly - Login",
  description: "Veja um resumo das suas finanças.",
};


const Login = async () => {

  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (

      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8 items-center">
        <Image
          src="/logosf.png"
          alt="Logo"
          width={200}
          height={100}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem Vindo</h1>
        <p className="mb-8 text-muted-foreground text-center">
          O Stockly é uma plataforma de gestão de estoques on-line que ajuda você a
          controlar sua armazenagem de produtos de forma simples e eficiente.
        </p>
        <SignInButton>
          <Button variant="default" className="mt-8">
            <LogInIcon className="mr-2" />
            Fazer Login ou Criar Conta
          </Button>
        </SignInButton>
      </div>

  );
};

export default Login;
