'use client';

import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Users, TrendingUp, Heart, Star, Flag, Clock, BookmarkIcon, MoreHorizontal, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserProfile } from "@/app/api/src/controllers/userController";
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken";

// Função para obter o token dos cookies
const getTokenFromCookies = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (!cookie) return null;   
  return cookie.split("=")[1];
};

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  interface User {
    username: string;
    name: string;
    email: string;
    created_at: string;
    bio?: string;
    reputation?: string;
    popularity?: number;
  }

  const [user, setUser] = useState<User | null>(null);
  

  useCheckTokenValidity(); // Chama o hook para verificar o token

  useEffect(() => {
    const loadUser = async () => {
      const token = getTokenFromCookies();

      console.log("Token recuperado dos cookies:", token);

      if (!token) {
        console.warn("Token não encontrado nos cookies.");
        return;
      }

      try {
        const data = await loadUserProfile(token);
        console.log("Dados do perfil carregados:", data);
        setUser(data);
       
      } catch (err) {
        console.error("Erro ao carregar o perfil:", err);
        
      }
    };

    loadUser();
  }, []);

  const isOwnProfile = user?.username === username;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex">
            <div className="w-80 p-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="w-full h-48 bg-yellow-300 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt={user?.name || "Usuário"}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div>
                    <h1 className="text-xl font-bold">{user?.name || "Carregando..."}</h1>
                    <p className="text-gray-500 text-sm">@{user?.username || "..."}</p>
                  </div>

                  {!isOwnProfile && (
                    <Button className="w-full mt-3 bg-black text-white hover:bg-black/90">Conectar-se</Button>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{user ? `Desde ${new Date(user.created_at).toLocaleDateString()}` : "..."}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{user?.email || "..."}</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <h3 className="font-medium text-sm mb-2">Bio</h3>
                    <p className="text-sm text-gray-600">
                      {user?.bio || "Esse usuário ainda não escreveu uma bio."}
                    </p>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <h3 className="font-medium">Reputação</h3>
                      <span className="text-gray-500">{user?.reputation || "Colaborador"}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Sub-observação</span>
                      <span>Ajudante</span>
                      <span>Colaborador</span>
                      <span>Líder</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <h3 className="font-medium text-sm mb-2">Popularidade</h3>
                    <div className="text-3xl font-bold">{user?.popularity || "0"}</div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <h3 className="font-medium text-sm mb-2">Conquistas</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>Líder</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <span>Ativo</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Heart className="w-4 h-4 text-gray-500" />
                        <span>Amigável</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-gray-500" />
                        <span>Efetivo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((post, index) => (
                  <div key={post} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-semibold">Título da Publicação</h2>
                      <div className="flex items-center gap-1">
                        <button className="text-gray-400 hover:text-gray-600">
                          <BookmarkIcon className="w-5 h-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
                        <Flag className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          Lorem ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>582</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>120</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>PUC - Campinas</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          Campanha
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{index === 2 ? "16d" : "45 min"}</span>
                        </div>
                      </div>
                    </div>

                    {index === 0 && (
                      <div className="mt-4 text-gray-600">
                        <span className="font-semibold">1 comentário</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
