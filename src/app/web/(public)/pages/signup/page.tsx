'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '../../../../api/src/schemas/auth'; // Ajuste o caminho conforme necessário
import { useRouter } from 'next/navigation';
import { registerUser } from '../../../../api/src/auth'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);
      if (response.id) { 
        alert('Cadastro realizado com sucesso!');
        router.push('/login'); 
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Falha no cadastro. Tente novamente.');
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
            <h1 className="text-2xl font-bold">Crie uma conta</h1>
            <p className="text-gray-500 text-sm">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-gray-700 hover:underline">
                Entre
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input type="text" placeholder="Nome completo" {...register('name')} />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder="m.example@email.com" {...register('email')} />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Senha" {...register('password')} />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Confirmação da senha" {...register('confirm_password')} />
              {errors.confirm_password && <span className="text-red-500 text-sm">{errors.confirm_password.message}</span>}
            </div>
            <div className="space-y-2">
              <Input type="text" placeholder="URL da imagem de perfil (opcional)" {...register('profile_image_url')} />
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
          <Image src="/space-escrita.svg" alt="Space escrita" width={150} height={150} className="fixed bottom-8 left-8 p-4 text-sm text-gray-500" />
        </div>
      </div>
    </main>
  );
}