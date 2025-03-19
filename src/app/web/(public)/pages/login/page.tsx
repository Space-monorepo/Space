'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../../../api/src/schemas/auth'; 
import { useRouter } from 'next/navigation';
import { loginUser } from '../../../../api/src/auth'; 
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const formData = new FormData();
      formData.append('username', data.email);
      formData.append('password', data.password);
  
      const response = await loginUser(formData);
      console.log('Resposta do servidor:', response); 
  
      // Verifica se o token foi recebido
      const token = response.token || response.data?.token || response.access_token;
  
      if (token) {
        console.log('Token recebido:', token); 
        localStorage.setItem('token', token);
        router.push('/home'); // Redireciona para a página inicial
      } else {
        console.error('Token não encontrado na resposta do servidor'); 
        alert('Token não encontrado. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error); 
      alert(error instanceof Error ? error.message : 'Falha no login. Verifique suas credenciais.');
    }
  };

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
            <h1 className="text-2xl font-bold">Entre com sua conta</h1>
            <p className="text-gray-500 text-sm">
              Não tem uma conta?{' '}
              <Link href="/signup" className="text-gray-700 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input type="email" placeholder="m.example@email.com" {...register('email')} />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Senha" {...register('password')} />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <Button type="submit" className="w-full text-white bg-black hover:bg-black/90">
              Entrar
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-100 px-2 text-gray-500">Ou entre com</span>
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
          <Image src="/space-escrita.svg" alt="Space escrita" width={150} height={150} className="fixed bottom-8 left-8 p-4 text-sm text-gray-500" />
        </div>
      </div>
    </main>
  );
}