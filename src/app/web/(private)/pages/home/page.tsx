"use client"

import { useState } from "react"
import Sidebar from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, MoreHorizontal, TrendingUp, MessageSquare, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken"
import axios from 'axios'
import { API_URL } from "@/config"



const posts = [
  {
    id: 1,
    title: "Título da Publicação",
    content:
      "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    upvotes: 582,
    comments: 120,
    location: "PUC - Campinas",
    tag: "Campanha",
    tagColor: "blue",
    views: 1489,
    image: "/placeholder.svg?height=80&width=80",
    imageType: "flag",
  },
  {
    id: 2,
    title: "Título da Publicação",
    content:
      "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    upvotes: 289,
    comments: 10,
    location: "Condomínio Campos do Conde",
    tag: "Anúncio",
    tagColor: "gray",
    views: 368,
    image: "/placeholder.svg?height=80&width=80",
    imageType: "megaphone",
  },
  {
    id: 3,
    title: "Título da Publicação",
    content:
      "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    upvotes: 350,
    comments: 89,
    location: "PUC - Campinas",
    tag: "Enquete",
    tagColor: "orange",
    views: 234,
    image: "/placeholder.svg?height=80&width=80",
    imageType: "people",
  },
  {
    id: 4,
    title: "Título da Publicação",
    content:
      "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    upvotes: 102,
    comments: 0,
    location: "Sidi",
    tag: "Denúncia",
    tagColor: "red",
    views: 24,
    image: "/placeholder.svg?height=80&width=80",
    imageType: "warning",
  },
]

export default function HomePage() {
  useCheckTokenValidity();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("geral")
  const [selectedPostType, setSelectedPostType] = useState<string | null>(null)
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
    poll_options: ['', '']
  })

  const handlePostTypeSelect = (type: string) => {
    setSelectedPostType(type)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPostData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePollOptionChange = (index: number, value: string) => {
    const newPollOptions = [...postData.poll_options]
    newPollOptions[index] = value
    setPostData(prev => ({
      ...prev,
      poll_options: newPollOptions
    }))
  }

  const createPost = async () => {
    try {
        // Simulação de IDs (substitua pelos valores reais do contexto da aplicação)
        const communityId = 'your-community-id'; 
        const userId = 'current-user-id';

        const postPayload = {
            community_id: communityId,
            user_id: userId,
            type_post: "campaign", // Tipo fixo conforme solicitado
            title: postData.title,
            content: postData.content,
            image: postData.image || "", // Se não houver imagem, mantém string vazia
            poll_options: postData.poll_options.filter(option => option.trim() !== ""), // Remove opções vazias
            total_likes: 0,
            comments: [], // Inicializa como array vazio
            status: "pending"
        };

        const response = await axios.post(`${API_URL}/posts`, postPayload);

        // Resetando o formulário e fechando modal
        setPostData({
            title: '',
            content: '',
            image: '',
            poll_options: ['', '']
        });
        setSelectedPostType(null);
        setIsCreateModalOpen(false);

        console.log('Post criado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao criar post:', error);
    }
};

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-4 max-w-4xl mx-auto">
        {/* Header with tabs and create button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-6">
            <button
              className={`text-lg ${activeTab === "geral" ? "font-semibold" : "text-gray-500"}`}
              onClick={() => setActiveTab("geral")}
            >
              Geral
            </button>
            <button
              className={`text-lg ${activeTab === "emAlta" ? "font-semibold" : "text-gray-500"}`}
              onClick={() => setActiveTab("emAlta")}
            >
              Em alta
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 17h.01" />
                <path d="M17 17h.01" />
              </svg>
            </button>
            <Button className="bg-black hover:bg-black/90 text-white" onClick={() => setIsCreateModalOpen(true)}>
              Criar publicação
            </Button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-4">
                {/* Post Image */}
                <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-md flex-shrink-0">
                  {post.imageType === "flag" && (
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      <line x1="30" y1="20" x2="30" y2="80" stroke="#555" strokeWidth="3" />
                      <polygon points="30,20 70,30 70,50 30,40" fill="#3B82F6" />
                    </svg>
                  )}
                  {post.imageType === "megaphone" && (
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      <path d="M30,40 L50,25 L50,75 L30,60 Z" fill="#EF4444" />
                      <rect x="20" y="40" width="15" height="20" fill="#EF4444" />
                      <path
                        d="M50,35 C70,35 75,20 80,20 M50,65 C70,65 75,80 80,80"
                        stroke="#EF4444"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  )}
                  {post.imageType === "people" && (
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      <rect x="20" y="50" width="60" height="30" fill="#D1D5DB" />
                      <circle cx="30" cy="40" r="10" fill="#D1D5DB" />
                      <circle cx="50" cy="40" r="10" fill="#D1D5DB" />
                      <circle cx="70" cy="40" r="10" fill="#D1D5DB" />
                    </svg>
                  )}
                  {post.imageType === "warning" && (
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      <polygon points="50,20 80,80 20,80" fill="#FBBF24" stroke="#EF4444" strokeWidth="2" />
                      <text x="50" y="65" fontSize="30" textAnchor="middle" fill="#EF4444">
                        !
                      </text>
                    </svg>
                  )}
                </div>

                {/* Post Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-2 text-sm">{post.content}</p>

                  {/* Post Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <TrendingUp className="w-4 h-4" />
                        <span>{post.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments === 0 ? "Sem interações" : post.comments}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{post.location}</span>
                      <Badge
                        className={`
                          ${post.tag === "Campanha" && "bg-blue-100 text-blue-800 hover:bg-blue-100"}
                          ${post.tag === "Anúncio" && "bg-gray-200 text-gray-800 hover:bg-gray-200"}
                          ${post.tag === "Enquete" && "bg-orange-100 text-orange-800 hover:bg-orange-100"}
                          ${post.tag === "Denúncia" && "bg-red-100 text-red-800 hover:bg-red-100"}
                        `}
                      >
                        {post.tag}
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-500">
                        <span>{post.views}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Post Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 bg-gray-100">
          <DialogTitle/>
          <DialogDescription className="text-center text-lg font-semibold mb-4">
            O que você gostaria de fazer?</DialogDescription>
          {!selectedPostType ? (
            <div className="grid grid-cols-2 gap-4 p-6">
              {/* Campanha */}
              <div 
                className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePostTypeSelect('campaign')}
              >
                <h3 className="text-xl font-semibold mb-2">Iniciar uma nova campanha</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Mobilize sua comunidade em uma causa ou ação coletiva. Arrecade fundos, organize mutirões e faça
                  diferença juntos!
                </p>
                <div className="flex justify-center mt-8">
                  <div className="w-40 h-40 opacity-20">
                    <svg viewBox="0 0 200 200">
                      <line x1="100" y1="40" x2="100" y2="160" stroke="#555" strokeWidth="4" />
                      <polygon points="100,40 160,60 160,100 100,80" fill="#555" />
                      <rect x="70" y="140" width="60" height="20" fill="#555" />
                      <circle cx="70" cy="150" r="5" fill="#555" />
                      <circle cx="130" cy="150" r="5" fill="#555" />
                      <path d="M40,150 C60,120 140,120 160,150" stroke="#555" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enquete */}
              <div 
                className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePostTypeSelect('poll')}
              >
                <h3 className="text-xl font-semibold mb-2">Lance uma enquete</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Quer saber a opinião de todos? Crie uma enquete rápida e tome decisões em conjunto.
                </p>
                <div className="flex justify-center mt-8">
                  <div className="w-40 h-40 opacity-20">
                    <svg viewBox="0 0 200 200">
                      <rect x="40" y="120" width="120" height="40" fill="#555" />
                      <circle cx="60" cy="100" r="15" fill="#555" />
                      <circle cx="100" cy="100" r="15" fill="#555" />
                      <circle cx="140" cy="100" r="15" fill="#555" />
                      <circle cx="60" cy="60" r="15" fill="#555" />
                      <circle cx="100" cy="60" r="15" fill="#555" />
                      <circle cx="140" cy="60" r="15" fill="#555" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Denúncia */}
              <div 
                className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePostTypeSelect('report')}
              >
                <h3 className="text-xl font-semibold mb-2">Registrar uma denúncia</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Encontrou algo inadequado? Nos ajude a manter o ambiente seguro e respeitoso para todos.
                </p>
                <div className="flex justify-center mt-8">
                  <div className="w-40 h-40 opacity-20">
                    <svg viewBox="0 0 200 200">
                      <polygon points="100,40 160,160 40,160" fill="#555" />
                      <text x="100" y="120" fontSize="60" textAnchor="middle" fill="#fff">
                        !
                      </text>
                      <circle cx="60" cy="180" r="10" fill="#555" />
                      <path d="M60,170 C60,150 80,150 80,170" stroke="#555" strokeWidth="2" fill="none" />
                      <path d="M50,160 L70,160" stroke="#555" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Anúncio */}
              <div 
                className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePostTypeSelect('ad')}
              >
                <h3 className="text-xl font-semibold mb-2">Anunciar</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Divulgue oportunidades, eventos ou qualquer novidade. Alcance toda a comunidade de forma simples e
                  rápida!
                </p>
                <div className="flex justify-center mt-8">
                  <div className="w-40 h-40 opacity-20">
                    <svg viewBox="0 0 200 200">
                      <path d="M60,80 L100,50 L100,150 L60,120 Z" fill="#555" />
                      <rect x="40" y="80" width="25" height="40" fill="#555" />
                      <path
                        d="M100,70 C140,70 150,40 160,40 M100,130 C140,130 150,160 160,160"
                        stroke="#555"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path d="M160,40 L180,60 M160,60 L180,40" stroke="#555" strokeWidth="2" />
                      <path d="M160,140 L180,160 M160,160 L180,140" stroke="#555" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <DialogHeader>
                <DialogTitle>
                  {selectedPostType === 'campaign' && 'Iniciar uma nova campanha'}
                  {selectedPostType === 'poll' && 'Criar uma nova enquete'}
                  {selectedPostType === 'ad' && 'Fazer um novo anúncio'}
                  {selectedPostType === 'report' && 'Registrar uma denúncia'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <Input 
                  name="title"
                  placeholder="Título"
                  value={postData.title}
                  onChange={handleInputChange}
                />
                
                <Textarea 
                  name="content"
                  placeholder="Descrição"
                  value={postData.content}
                  onChange={handleInputChange}
                />

                {selectedPostType === 'poll' && (
                  <div className="space-y-2">
                    <Input 
                      placeholder="Opção 1"
                      value={postData.poll_options[0]}
                      onChange={(e) => handlePollOptionChange(0, e.target.value)}
                    />
                    <Input 
                      placeholder="Opção 2"
                      value={postData.poll_options[1]}
                      onChange={(e) => handlePollOptionChange(1, e.target.value)}
                    />
                  </div>
                )}

                {selectedPostType === 'campaign' && (
                  <Input 
                    name="image"
                    placeholder="URL da imagem"
                    value={postData.image}
                    onChange={handleInputChange}
                  />
                )}

                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPostType(null)}
                  >
                    Voltar
                  </Button>
                  <Button onClick={createPost}>Criar</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}