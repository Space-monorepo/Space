'use client'

import Sidebar from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserProfile } from "@/app/api/src/controllers/userController";
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken";
import getTokenFromCookies from "@/app/api/src/controllers/getTokenFromCookies";
import UserProfileCard from "../components/UserProfileCard";
import PostList from "../components/PostList";
import { useBypassAuth } from "@/app/api/hooks/useBypassAuth";

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
      <div className="h-screen bg-green-300">asidebar</div>
      <div className="flex-1 w-screen mx-24">
        <div className="bg-white border-1 border-gray-300 border-t-0 rounded-b-xs w-auto shadow h-50 mb-5"></div>

        <div className="flex justify-between">
          <div className="flex-1 mr-5">
            <div className="bg-white mb-5 border-1 border-gray-300 rounded shadow min-h-40">biografia</div>
            <div className="bg-white border-1 border-gray-300 rounded shadow flex-col">
              <div className="my-5">
                reputação
              </div>

              <div className="my-5">
                popularidade
              </div>

              <div className="my-5">
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