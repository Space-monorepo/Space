import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Hook personalizado para verificar a validade do token
export const useCheckTokenValidity = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch('http://localhost:8000/users/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // Se a resposta for negativa (token expirado), limpa o cookie e redireciona para login
            Cookies.remove('token');
            router.push('/login');
          }
        } catch (error) {
          console.error("Erro ao validar token:", error);
          Cookies.remove('token');
          router.push('/login');
        }
      };

      verifyToken();
    } else {
      // Se o token não existir, redireciona para login
      router.push('/login');
    }
  }, [router]);
};
