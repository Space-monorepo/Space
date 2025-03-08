import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
     
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-6">
        <div className="max-w-[400px] w-full">
          <Image src="/Planet.png" alt="Space" width={400} height={400} className="mx-auto" priority />
        </div>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100 p-6">
        <div className="max-w-[400px] w-full space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Crie uma conta</h1>
            <p className="text-gray-500 text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-gray-700 hover:underline">
                Entre
              </Link>
            </p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input type="text" placeholder="Nome" />
              </div>
              <div className="space-y-2">
                <Input type="text" placeholder="Sobrenome" />
              </div>
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder="m.example@email.com" />
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Senha" />
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Confirmação da senha" />
            </div>
            <Button type="submit" className="w-full text-white bg-black hover:bg-black/90">
              Criar conta
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-100 px-2 text-gray-500">Ou se registre com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Outlook
            </Button>
          </div>
        </div>
          <Image src="/space-escrita.svg" alt="Space escrita" width={150} height={150} className="fixed bottom-8 left-8 p-4 text-sm text-gray-500" />
      </div>
    </main>
  )
}

