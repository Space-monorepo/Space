"use client"

import { useState } from "react"
import { ArrowLeft, Filter, SortDesc, Eye } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/ui/sidebar"
import ApproveCampaignModal from "@/components/modals/community/ApproveCampaignModal"
import RejectCampaignModal from "@/components/modals/community/RejectCampaignModal"

type CommunuityProps = {
  params: {
    id: string
  }
}

type Campaign = {
  id: number
  title: string
  leader: string
  participants: number
  date: string
  status: "Em análise" | "Aprovado" | "Rejeitado"
  description?: string
  accesses?: number
  likes?: number
  comments?: number
}

export default function CommunityAdminPage({ params }: CommunuityProps) {
  const [activeTab, setActiveTab] = useState("Campanhas")
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const tabs = ["Campanhas", "Denúncias", "Usuários", "Anúncios"]

  const campaigns: Campaign[] = [
    {
      id: 1,
      title: "Revitalização da Sala de Biblioteca",
      leader: "Rafael Lanza",
      participants: 245,
      date: "18/02/2025",
      status: "Em análise",
      description: `A sala de estudos da biblioteca da nossa unidade está precisando de uma atenção especial. Muitos alunos usam o espaço todos os dias, mas infelizmente ele vem apresentando problemas de estrutura, iluminação fraca e cadeiras danificadas. Estamos iniciando uma campanha para arrecadar fundos e voluntários com o objetivo de revitalizar esse espaço tão importante para nossa rotina acadêmica. A proposta inclui pequenas reformas, pintura, reorganização dos móveis e instalação de lâmpadas novas. Toda ajuda será bem-vinda – seja com contribuições financeiras ou com tempo e disposição para ajudar no mutirão.

Se você acredita na força da coletividade e no impacto de um ambiente de estudo digno, participe da campanha!`,
      accesses: 5000,
      likes: 678,
      comments: 72,
    },
    {
      id: 2,
      title: "Título da Campanha",
      leader: "Rafael Lanza",
      participants: 245,
      date: "18/02/2025",
      status: "Em análise",
      accesses: 5000,
    },
  ]

  // Set the first campaign as selected by default if none is selected
  if (!selectedCampaign && campaigns.length > 0) {
    setSelectedCampaign(campaigns[0])
  }

  const handleApproveCampaign = (subject: string, message: string) => {
    // Here you would implement the actual approval logic
    console.log("Approving campaign with:", { subject, message })

    // Update the campaign status
    if (selectedCampaign) {
      const updatedCampaign = { ...selectedCampaign, status: "Aprovado" as const }
      setSelectedCampaign(updatedCampaign)
    }

    setIsApproveModalOpen(false)
  }

  const handleRejectCampaign = (subject: string, reason: string) => {
    // Here you would implement the actual rejection logic
    console.log("Rejecting campaign with:", { subject, reason })

    // Update the campaign status
    if (selectedCampaign) {
      const updatedCampaign = { ...selectedCampaign, status: "Rejeitado" as const }
      setSelectedCampaign(updatedCampaign)
    }

    setIsRejectModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#161616]">
      <Sidebar variant="static"/>
      <div className="ml-64 flex">
        {/* Middle section - Navigation and List */}
        <div className="w-[400px] border-r border-[#e0e0e0] bg-white min-h-screen">
          {/* Header */}
          <div className="p-4 border-b border-[#e0e0e0] flex items-center gap-3">
            <Link href="/administration" className="p-1 hover:bg-[#e5e5e5]">
              <ArrowLeft className="h-5 w-5 text-[#525252]" />
            </Link>
            <h1 className="text-xl font-medium">Título da Comunidade</h1>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#e0e0e0]">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? "bg-[#f4f4f4] text-[#161616] border-l-4 border-black"
                    : "text-[#525252] hover:bg-[#f8f8f8]"
                } block w-full text-left`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter and Sort */}
          <div className="p-4 flex items-center justify-between border-b border-[#e0e0e0]">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[#e0e0e0] hover:bg-[#f8f8f8]">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[#e0e0e0] hover:bg-[#f8f8f8]">
              <SortDesc className="h-4 w-4" />
              Ordenar
            </button>
          </div>

          {/* Campaigns List */}
          <div className="overflow-auto">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`p-4 border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f8f8f8] ${
                  selectedCampaign?.id === campaign.id ? "bg-[#f4f4f4]" : ""
                }`}
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{campaign.title}</h3>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-[#525252]" />
                    <span className="text-xs text-[#525252]">{campaign.accesses?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs text-[#525252] mb-1">Líder: {campaign.leader}</div>
                <div className="text-xs text-[#525252] mb-2">
                  {campaign.participants.toLocaleString()} participantes
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#525252]">{campaign.date}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      campaign.status === "Em análise"
                        ? "bg-[#fff8e1] text-[#b28600]"
                        : campaign.status === "Aprovado"
                          ? "bg-[#defbe6] text-[#0e6027]"
                          : "bg-[#fff1f1] text-[#da1e28]"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right section - Campaign Details */}
        {selectedCampaign && (
          <div className="flex-1 p-6">
            <div className="bg-white border border-[#e0e0e0] p-6">
              {/* Author info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ProfilePic2.svg"
                    alt="Rafael Lanza"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Rafael Lanza</span>
                  <div className="w-1 h-1 rounded-full bg-[#525252]"></div>
                  <span className="text-xs px-2 py-0.5 bg-[#393939] text-white">Líder</span>
                </div>
              </div>

              {/* Campaign title */}
              <div className="mb-4">
                <div className="text-sm text-[#525252] mb-1">Título:</div>
                <h2 className="text-lg font-medium">{selectedCampaign.title}</h2>
              </div>

              {/* Campaign description */}
              <div className="mb-6">
                <div className="text-sm text-[#525252] mb-1">Descrição:</div>
                <p className="text-[#161616] whitespace-pre-line">{selectedCampaign.description}</p>
              </div>

              {/* Campaign stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-[#525252] mb-1">Data publicada:</div>
                  <div>{selectedCampaign.date}</div>
                </div>
                <div>
                  <div className="text-sm text-[#525252] mb-1">Curtidas:</div>
                  <div>{selectedCampaign.likes?.toLocaleString() || 0} curtidas</div>
                </div>
                <div>
                  <div className="text-sm text-[#525252] mb-1">Número de acessos:</div>
                  <div>{selectedCampaign.accesses?.toLocaleString() || 0} acessos</div>
                </div>
                <div>
                  <div className="text-sm text-[#525252] mb-1">Comentários:</div>
                  <div>{selectedCampaign.comments?.toLocaleString() || 0} comentários</div>
                </div>
                <div>
                  <div className="text-sm text-[#525252] mb-1">Participantes:</div>
                  <div>{selectedCampaign.participants?.toLocaleString() || 0} pessoas</div>
                </div>
                <div>
                  <div className="text-sm text-[#525252] mb-1">Status:</div>
                  <div
                    className={`inline-block px-2 py-0.5 rounded-full text-sm ${
                      selectedCampaign.status === "Em análise"
                        ? "bg-[#fff8e1] text-[#b28600]"
                        : selectedCampaign.status === "Aprovado"
                          ? "bg-[#defbe6] text-[#0e6027]"
                          : "bg-[#fff1f1] text-[#da1e28]"
                    }`}
                  >
                    {selectedCampaign.status}
                  </div>
                </div>
              </div>

              {/* Action buttons - only show if status is "Em análise" */}
              {selectedCampaign.status === "Em análise" && (
                <div className="flex items-center gap-4">
                  <button
                    className="px-4 py-2 border border-[#e0e0e0] hover:bg-[#f8f8f8] flex-1"
                    onClick={() => setIsRejectModalOpen(true)}
                  >
                    Rejeitar
                  </button>
                  <button
                    className="px-4 py-2 bg-[#161616] text-white hover:bg-[#262626] flex-1"
                    onClick={() => setIsApproveModalOpen(true)}
                  >
                    Aprovar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ApproveCampaignModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onApprove={handleApproveCampaign}
        campaignTitle={selectedCampaign?.title || ""}
        campaignAuthor={selectedCampaign?.leader || ""}
      />

      <RejectCampaignModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleRejectCampaign}
        campaignTitle={selectedCampaign?.title || ""}
        campaignAuthor={selectedCampaign?.leader || ""}
      />
    </div>
  )
}
