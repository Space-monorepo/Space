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
import ProgressBar from "../components/ProgressBar";

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

      <div className="flex-1 w-screen mx-8">

        <div className="bg-white border-1 border-gray-300 border-t-0 rounded-b-xs w-auto shadow h-50 mb-5
        flex items-end justify-between">
          <div className="flex items-end">
            <Image src="/profile-retangle.svg" alt="Profile" width={140} height={60} />
            <div className="flex flex-col m-3">
              <div className="text-xl">Briann Gomes</div>
              <div className="text-xs text-zinc-500">@brianngomes</div>
            </div>
          </div>

          {/* <a href="/pagina-de-destino" className="m-4 bg-black text-zinc-200 px-10 py-2 rounded-sm
          hover:bg-gray-800">
            Conectar-se
          </a> */}

          <ConnectButton />

        </div>

        <div className="flex justify-between">
          <div className="flex-1 mr-5">
            <div className="bg-white mb-5 border-1 border-gray-300 rounded shadow min-h-40 flex flex-col justify-around p-4 gap-3">
              <div className="flex gap-2">Email:
                <div className="text-zinc-500 text-sm mt-0.5">brianngomes@gmail.com</div>
              </div>

              <div className="flex gap-2">Entrou em:
                <div className="text-zinc-500 text-sm mt-0.5">01/01/2025</div>
              </div>

              <div className="gap-2">Biografia:
                <div className="text-zinc-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  efficitur, nunc ut bibendum facilisis, nisi nunc aliquet nunc, nec
                  tincidunt nunc nunc eget nunc. Donec efficitur, nunc ut bibendum
                  facilisis, nisi nunc aliquet nunc, nec tincidunt nunc nunc eget nunc.
                  
                </div>
              </div>

            </div>
            <div className="bg-white border-1 border-gray-300 rounded shadow flex-col flex p-4">
              <div className="mb-2">Reputação</div>
              <ProgressBar />
              <div className="flex justify-around text-xs text-zinc-500">
                <div>Sob Observação</div>
                <div>Ajudante</div>
                <div>Colaborador</div>
                <div>Líder</div>
              </div>

              <div className="mt-8">Popularidade</div>

              <div className="flex my-6 justify-center text-3xl">39.257</div>

              <div className="mb-4">Conquistas</div>
              <div className="flex justify-between text-zinc-500">

                <div className="flex">
                  <Image src="/peoples.svg" alt="teste" className="mr-1" width={20} height={20} />
                  Líder</div>
                <div className="flex">
                  <Image src="/mobile.svg" alt="teste" className="mr-1" width={20} height={20} />
                  Ativo</div>
                <div className="flex">
                  <Image src="/heart.svg" alt="teste" className="mr-1" width={20} height={20} />
                  Amigável</div>
                <div className="flex">
                  <Image src="/star.svg" alt="teste" width={20} height={20} />
                  Efetivo</div>
              </div>

            </div>
          </div>
          <div className="w-3/5 bg-white border-1 border-gray-300 rounded shadow">publicação</div>

        </div>
      </div>
    </div>
  );
}