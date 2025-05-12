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