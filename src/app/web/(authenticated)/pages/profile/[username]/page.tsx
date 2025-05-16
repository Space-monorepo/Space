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
import { Loader2 } from "lucide-react";

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
  const { loading } = useCheckTokenValidity();
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
    return   <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Loader2 className="h-10 w-10 animate-spin text-black mb-4" />
      <h1 className="text-xl font-semibold text-gray-800">Processando...</h1>
      <p className="text-gray-500 mt-2">Você será redirecionado em instantes.</p>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar variant="static"/>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto flex">
          <UserProfileCard 
            user={user} 
            isOwnProfile={isOwnProfile} 
            onImageChange={handleImageChange} 
          />
          <div className="flex-1 p-4">
            <PostList />
          </div>
        </div>
      </main>
    </div>
  );
}