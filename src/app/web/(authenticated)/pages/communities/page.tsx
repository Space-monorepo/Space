"use client"

import { useState } from "react"
import { Search, Lock, Clock, MoreHorizontal, ArrowRight } from "lucide-react"
import Sidebar from "@/components/ui/sidebar"

type Community = {
  id: number
  title: string
  founder: string
  icon: string
  color: string
  description?: string
  members?: number
  isPrivate?: boolean
  createdYear?: number
}

export default function ComunidadesPage() {
  const communities: Community[] = [
    {
      id: 1,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "🦌",
      color: "#10b981",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
      members: 1000000,
      isPrivate: true,
      createdYear: 2025,
    },
    {
      id: 2,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "🤖",
      color: "#ef4444",
      members: 500,
      isPrivate: false,
      createdYear: 2024,
    },
    {
      id: 3,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "👾",
      color: "#4b5563",
      members: 2500,
      isPrivate: true,
      createdYear: 2023,
    },
    {
      id: 4,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "🌱",
      color: "#ffffff",
      members: 750,
      isPrivate: false,
      createdYear: 2025,
    },
  ]

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(communities[0])
  const [activeTab, setActiveTab] = useState("Sobre")

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#161616]">
      <Sidebar variant="static"/>
      <div className="ml-64 flex h-screen">
        {/* Communities List */}
        <div className="w-[500px] border-r border-[#e0e0e0] bg-white overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#e0e0e0]">
            <h1 className="text-xl font-medium mb-4">Minhas comunidades</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#525252] h-4 w-4" />
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] focus:outline-none focus:border-[#0f62fe]"
              />
            </div>
          </div>

          {/* Communities */}
          <div className="overflow-auto flex-1">
            {communities.map((community) => (
              <div
                key={community.id}
                className={`p-4 border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f8f8f8] ${
                  selectedCommunity?.id === community.id ? "bg-[#f4f4f4]" : ""
                }`}
                onClick={() => setSelectedCommunity(community)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center text-xl`}
                      style={{
                        backgroundColor: community.color === "#ffffff" ? "#f4f4f4" : community.color,
                        border: community.color === "#ffffff" ? "1px solid #e0e0e0" : "none",
                      }}
                    >
                      <span>{community.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{community.title}</h3>
                      <p className="text-xs text-[#525252]">Fundador: {community.founder}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="p-1 text-[#525252] hover:text-[#161616]">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-[#525252] hover:text-[#161616]">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Details */}
        {selectedCommunity && (
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-medium mb-2">{selectedCommunity.title}</h1>
                <div className="flex items-center text-sm text-[#525252]">
                  <Lock className="h-4 w-4 mr-1" />
                  <span>
                    Grupo {selectedCommunity.isPrivate ? "privado" : "público"} ·{" "}
                    {selectedCommunity.members?.toLocaleString()} membros
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-[#e0e0e0] mb-6">
                <div className="flex">
                  {["Sobre", "Discussão", "Moderadores", "Avaliações"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-3 text-sm font-medium ${
                        activeTab === tab
                          ? "text-[#0f62fe] border-b-2 border-[#0f62fe]"
                          : "text-[#525252] hover:text-[#161616]"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="mb-6">
                {activeTab === "Sobre" && (
                  <div>
                    <div className="border border-[#e0e0e0] bg-white mb-4">
                      <div className="p-4 border-b border-[#e0e0e0]">
                        <h3 className="font-medium">Sobre</h3>
                      </div>
                      <div className="p-4">
                        <p className="text-[#161616] whitespace-pre-line">{selectedCommunity.description}</p>
                      </div>
                    </div>

                    <div className="border border-[#e0e0e0] bg-white">
                      <div className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center border border-[#e0e0e0]">
                          <Clock className="h-4 w-4 text-[#525252]" />
                        </div>
                        <div>
                          <h3 className="font-medium">História</h3>
                          <p className="text-sm text-[#525252]">Criado em {selectedCommunity.createdYear}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Discussão" && (
                  <div className="border border-[#e0e0e0] bg-white p-4">
                    <p className="text-[#525252]">Discussões da comunidade aparecerão aqui.</p>
                  </div>
                )}

                {activeTab === "Moderadores" && (
                  <div className="border border-[#e0e0e0] bg-white p-4">
                    <p className="text-[#525252]">Lista de moderadores da comunidade.</p>
                  </div>
                )}

                {activeTab === "Avaliações" && (
                  <div className="border border-[#e0e0e0] bg-white p-4">
                    <p className="text-[#525252]">Avaliações da comunidade aparecerão aqui.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
