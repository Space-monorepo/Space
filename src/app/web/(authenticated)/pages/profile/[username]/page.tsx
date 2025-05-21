'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserProfile } from "@/app/api/src/controllers/userController";
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken";
import getTokenFromCookies from "@/app/api/src/controllers/getTokenFromCookies";
import { useBypassAuth } from "@/app/api/hooks/useBypassAuth";
import Sidebar from "@/components/ui/sidebar";
import Image from "next/image";
import ConnectButton from "../components/ConnectButton";

export interface User {
  username: string;
  name: string;
  email: string;
  created_at: string;
  bio?: string;
  reputation_level?: string;
  popularity?: number;
  profile_image_url?: string;
}

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const bypass = useBypassAuth();
  const { user: authUser, loading } = useCheckTokenValidity();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (bypass) return;

    const loadUser = async () => {
      const token = getTokenFromCookies();
      if (!token) return;

      try {
        const data = await loadUserProfile(token);
        setUser(data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    };
    loadUser();
  }, [bypass]);

  const isOwnProfile = user?.username === username;

  const handleImageChange = (newImageUrl: string) => {
    setUser(prev => prev ? { ...prev, profile_image_url: newImageUrl } : null);
  };

  if (loading && !bypass) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex bg-gray-100">

      <Sidebar variant="static" />

      <div className="flex-1 w-screen mx-12">

        <div className="bg-white border-1 border-gray-300 border-t-0 rounded-b-xs w-auto shadow h-50 mb-5
        flex items-end justify-between">
          <div className="flex items-end">
            <Image src="/profile-retangle.svg" alt="Profile" width={140} height={140} />
            <div className="flex flex-col m-3">
              <div className="text-xl">Briann Gomes</div>
              <div className="text-xs text-zinc-500">@brianngomes</div>
            </div>
          </div>
          
          {/* <a href="/pagina-de-destino" className="m-4 bg-black text-zinc-200 px-10 py-2 rounded-sm
          hover:bg-gray-800">
            Conectar-se
          </a> */}

          <ConnectButton/>

        </div>

        <div className="flex justify-between">
          <div className="flex-1 mr-5">
            <div className="bg-white mb-5 border-1 border-gray-300 rounded shadow min-h-40 flex flex-col
             ">
              <div>email</div>
              <div>entrou em:</div>
              <div>biografia</div>
            </div>
            <div className="bg-white border-1 border-gray-300 rounded shadow flex-col flex">
              <div className="">
                reputação
              </div>

              <div className="">
                popularidade
              </div>

              <div className="">
                conquistas
              </div>

            </div>
          </div>
          <div className="w-3/5 bg-white border-1 border-gray-300 rounded shadow">publicação</div>

        </div>
      </div>
    </div>
  );
}