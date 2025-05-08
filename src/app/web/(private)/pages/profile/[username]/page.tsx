'use client'

import Sidebar from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserProfile } from "@/app/api/src/controllers/userController";
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken";
import getTokenFromCookies from "@/app/api/src/controllers/getTokenFromCookies";
import UserProfileCard from "../components/UserProfileCard";
import PostList from "../components/PostList";

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

  const [user, setUser] = useState<User | null>(null);
  useCheckTokenValidity();

  useEffect(() => {
    const loadUser = async () => {
      const token = getTokenFromCookies();
      if (!token) return console.warn("Token não encontrado nos cookies.");
      try {
        const data = await loadUserProfile(token);
        setUser(data);
      } catch (err) {
        console.error("Erro ao carregar o perfil:", err);
      }
    };
    loadUser();
  }, []);

  const isOwnProfile = user?.username === username;

  const handleImageChange = (newImageUrl: string) => {
    setUser((prev) => prev ? { ...prev, profile_image_url: newImageUrl } : prev);
  };

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
