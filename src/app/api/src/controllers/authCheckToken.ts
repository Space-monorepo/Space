import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Hook personalizado para verificar a validade do token e obter dados do usuário
export const useCheckTokenValidity = () => {
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch("http://localhost:8000/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser({ name: data.name, username: data.username });
          } else {
            Cookies.remove("token");
            router.push("/login");
          }
        } catch (error) {
          console.error("Erro ao validar token:", error);
          Cookies.remove("token");
          router.push("/login");
        } finally {
          setLoading(false);
        }
      };

      verifyToken();
    } else {
      router.push("/login");
    }
  }, [router]);

  return { user, loading };
};
