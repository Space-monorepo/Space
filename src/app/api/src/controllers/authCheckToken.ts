import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { API_URL } from "@/config";
import { useBypassAuth } from "../../hooks/useBypassAuth";

export const useCheckTokenValidity = () => {
  const [user, setUser] = useState<{ name: string; username: string; profile_image_url: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const bypass = useBypassAuth();

  useEffect(() => {
    if (bypass) {
      setLoading(false);
      return;
    }

    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.name,
            username: data.username,
            profile_image_url: data.profile_image_url
          });
        } else {
          Cookies.remove("token");
          toast.warning("Sua sessão expirou. Faça login novamente.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao validar token:", error);
        Cookies.remove("token");
        toast.error("Erro ao verificar sessão. Faça login novamente.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router, bypass]);

  return { user, loading };
};