'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserProfile } from "@/app/api/src/controllers/userController";
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken";
import getTokenFromCookies from "@/app/api/src/controllers/getTokenFromCookies";
import { useBypassAuth } from "@/app/api/hooks/useBypassAuth";
import { 
  Loader2, 
  MessageSquare, 
  BookmarkIcon, 
  MoreHorizontal,
  Calendar,
  Mail,
  ArrowUp,
  Activity,
  Users,
  FileText,
  Heart,
  Award
} from "lucide-react";
import FilePicker from "@/components/ui/FilePicker";
import Sidebar from "@/components/ui/sidebar";

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
    // A função onImageChange é chamada pelo componente FilePicker após
    // o upload para o Cloudinary e atualização do perfil na API
    setUser(prev => prev ? { ...prev, profile_image_url: newImageUrl } : null);
  };

  // Posts mockados para a lista
  const posts = [
    { 
      id: 1,
      title: "Desrespeito recorrente ao horário das aulas", 
      description: "Gostaria de registrar uma denúncia em relação a um grupo de alunos que tem interrompido repetidamente o início das aulas da turma de Engenharia de Software, no período noturno...", 
      content: "Gostaria de registrar uma denúncia em relação a um grupo de alunos que tem interrompido repetidamente o início das aulas da turma de Engenharia de Software, no período noturno. Nas últimas duas semanas, esses estudantes chegam com atraso, fazem barulho na entrada da sala e interrompem professores e colegas que já estão concentrados no conteúdo.",
      likes: 350, 
      comments: 52, 
      shares: 89,
      timeAgo: "2h",
      location: "PUC - Campinas",
      type: "Denúncia"
    },
    { 
      id: 2,
      title: "Problemas com equipamentos no laboratório", 
      description: "Venho por meio desta denúncia informar sobre o estado dos equipamentos no laboratório de informática do bloco B...", 
      content: "Venho por meio desta denúncia informar sobre o estado dos equipamentos no laboratório de informática do bloco B. Vários computadores estão com problemas técnicos, dificultando a realização das atividades práticas.",
      likes: 210, 
      comments: 38, 
      shares: 45,
      timeAgo: "16h",
      location: "PUC - Campinas",
      type: "Denúncia"
    },
  ];

  // Níveis de reputação para a barra de reputação
  const reputationLevels = ["Sob observação", "Ajudante", "Colaborador", "Líder"];

  // Achievements para o perfil
  const achievements = [
    { icon: <Users className="h-5 w-5" />, name: "Líder" },
    { icon: <FileText className="h-5 w-5" />, name: "Ativo" },
    { icon: <Heart className="h-5 w-5" />, name: "Amigável" },
    { icon: <Award className="h-5 w-5" />, name: "Efetivo" },
  ];

  // Função para calcular a porcentagem de reputação
  const getReputationPercentage = (level?: string) => {
    const index = reputationLevels.indexOf(level || "Sob observação");
    const percentage = ((index + 1) / reputationLevels.length) * 100;
    return percentage;
  };

  if (loading && !bypass) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <Loader2 className="h-10 w-10 animate-spin text-black mb-4" />
        <h1 className="text-xl font-semibold text-gray-800">Processando...</h1>
        <p className="text-gray-500 mt-2">Você será redirecionado em instantes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#161616]">
      <Sidebar variant="static"/>
      <div className="ml-64">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white border-b border-[#e0e0e0]">
            <div className="relative">
              <div className="h-32 bg-[#f4f4f4]"></div>
              <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                <div className="w-32 h-32 border-4 border-white bg-[#f4f4f4] overflow-hidden">
                  {/* Substitua a div por FilePicker - com ajuste de altura */}
                  <div className="h-full w-full">
                    <FilePicker
                      currentImageUrl={user?.profile_image_url}
                      onImageChange={handleImageChange}
                      isOwnProfile={isOwnProfile}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-20 pb-6 px-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-medium">{user?.name || "Carregando..."}</h1>
                <p className="text-[#525252]">@{user?.username || "..."}</p>
              </div>
              <div> 
                {/* //TODO: ajustar para conforme for o perfil - se for o próprio da pesssoa, ele pega: editar perfil, se for olhando o perfil de outra pessoa, ele pega: enviar mensagem e conectar-se*/}
                {isOwnProfile ? (
                  <button className="px-4 py-2 bg-[#f4f4f4] hover:bg-[#e0e0e0] transition-colors">
                    Editar perfil
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#161616] text-white hover:bg-[#262626] transition-colors">
                      Enviar mensagem
                    </button>
                    <button className="px-4 py-2 bg-[#f4f4f4] hover:bg-[#e0e0e0] transition-colors">
                      Conectar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-6 p-6">
            {/* Left Column - Profile Info */}
            <div className="w-1/3 space-y-6">
              {/* User Info */}
              <div className="bg-white border border-[#e0e0e0] p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#525252]" />
                    <p className="text-sm font-medium">Email:</p>
                  </div>
                  <p className="ml-6">{user?.email || "..."}</p>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#525252]" />
                    <p className="text-sm font-medium">Entrou em:</p>
                  </div>
                  <p className="ml-6">
                    {user ? new Date(user.created_at).toLocaleDateString() : "..."}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Biografia:</p>
                  <p className="text-sm">
                    {user?.bio || "Esse usuário ainda não escreveu uma bio."}
                  </p>
                </div>
              </div>

              {/* Reputação */}
              <div className="bg-white border border-[#e0e0e0] p-6">
                <h2 className="text-base font-medium mb-4">Reputação</h2>
                <div className="relative h-2 bg-[#e0e0e0] mb-2">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#0f62fe]"
                    style={{ width: `${getReputationPercentage(user?.reputation_level)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-[#525252]">
                  {reputationLevels.map((level, index) => (
                    <span
                      key={index}
                      className={level === user?.reputation_level ? "text-[#0f62fe] font-medium" : ""}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              {/* Popularidade */}
              <div className="bg-white border border-[#e0e0e0] p-6">
                <h2 className="text-base font-medium mb-4">Popularidade</h2>
                <p className="text-3xl font-light text-center">{user?.popularity?.toLocaleString() || 0}</p>
              </div>

              {/* Conquistas */}
              <div className="bg-white border border-[#e0e0e0] p-6">
                <h2 className="text-base font-medium mb-4">Conquistas</h2>
                <div className="flex justify-between">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-8 h-8 flex items-center justify-center text-[#525252]">
                        {achievement.icon}
                      </div>
                      <span className="text-xs mt-1">{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Posts */}
            <div className="w-2/3">
              {posts.length === 0 ? (
                <div className="bg-white border border-[#e0e0e0] p-8 text-center">
                  <p className="text-[#525252] mb-6">Você ainda não possui nenhuma publicação...</p>
                  <button className="px-4 py-2 bg-[#161616] text-white hover:bg-[#262626] transition-colors">
                    Criar publicação
                  </button>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-white border border-[#e0e0e0] mb-4">
                    <div className="p-4 border-b border-[#e0e0e0]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={user?.profile_image_url || "/placeholder.svg?height=40&width=40&text=👤"}
                              alt={user?.name || "Perfil"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{user?.name || "Usuário"}</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#525252]"></div>
                              <span className="text-xs px-2 py-0.5 bg-[#393939] text-white">
                                {user?.reputation_level || "Sob observação"}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-[#525252]">
                              <span>{post.type}</span>
                              <span className="mx-1">•</span>
                              <span>{post.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#525252]">{post.location}</span>
                          <button className="p-1 hover:bg-[#f4f4f4]">
                            <BookmarkIcon className="h-5 w-5 text-[#525252]" />
                          </button>
                          <button className="p-1 hover:bg-[#f4f4f4]">
                            <MoreHorizontal className="h-5 w-5 text-[#525252]" />
                          </button>
                        </div>
                      </div>

                      <h2 className="text-xl font-medium mb-2">{post.title}</h2>
                      <p className="text-[#161616] mb-4">{post.content}</p>

                      <div className="flex items-center gap-6 text-[#525252]">
                        <div className="flex items-center gap-1">
                          <ArrowUp className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4" />
                          <span className="text-sm">{post.shares}</span>
                        </div>
                      </div>
                    </div>
                    {!isOwnProfile && (
                      <div className="p-4 bg-[#f4f4f4]">
                        <button className="w-full py-2 bg-[#161616] text-white hover:bg-[#262626] transition-colors">
                          Confirmar problema
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}