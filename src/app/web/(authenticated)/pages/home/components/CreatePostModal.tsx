"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPostType: string | null
  onPostTypeSelect: (type: string | null) => void
  postData: {
    title: string
    content: string
    image?: string
    poll_options: string[]
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onPollOptionChange: (index: number, value: string) => void
}

export default function CreatePostModal({
  isOpen,
  onClose,
  selectedPostType,
  onPostTypeSelect,
  postData,
  onInputChange,
  onPollOptionChange,
}: CreatePostModalProps) {
  const createPost = async () => {
    // Simulação de criação de post
    console.log("Criando post:", {
      type: selectedPostType,
      title: postData.title,
      content: postData.content,
      poll_options: selectedPostType === "poll" ? postData.poll_options : undefined,
      image: selectedPostType === "campaign" ? postData.image : undefined,
    })

    // Fechar o modal após "criar" o post
    onPostTypeSelect(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 bg-gray-100">
        <DialogTitle />
        <DialogDescription className="text-center text-lg font-semibold mb-4">
          O que você gostaria de fazer?
        </DialogDescription>
        {!selectedPostType ? (
          <div className="grid grid-cols-2 gap-4 p-6">
            <PostTypeOption
              title="Iniciar uma nova campanha"
              description="Mobilize sua comunidade em uma causa ou ação coletiva. Arrecade fundos, organize mutirões e faça diferença juntos!"
              onClick={() => onPostTypeSelect("campaign")}
            />
            <PostTypeOption
              title="Lance uma enquete"
              description="Quer saber a opinião de todos? Crie uma enquete rápida e tome decisões em conjunto."
              onClick={() => onPostTypeSelect("poll")}
            />
            <PostTypeOption
              title="Registrar uma denúncia"
              description="Encontrou algo inadequado? Nos ajude a manter o ambiente seguro e respeitoso para todos."
              onClick={() => onPostTypeSelect("report")}
            />
            <PostTypeOption
              title="Anunciar"
              description="Divulgue oportunidades, eventos ou qualquer novidade. Alcance toda a comunidade de forma simples e rápida!"
              onClick={() => onPostTypeSelect("ad")}
            />
          </div>
        ) : (
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>
                {selectedPostType === "campaign" && "Iniciar uma nova campanha"}
                {selectedPostType === "poll" && "Criar uma nova enquete"}
                {selectedPostType === "ad" && "Fazer um novo anúncio"}
                {selectedPostType === "report" && "Registrar uma denúncia"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <Input name="title" placeholder="Título" value={postData.title} onChange={onInputChange} />

              <textarea
                name="content"
                placeholder="Descrição"
                value={postData.content}
                onChange={onInputChange}
                className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />

              {selectedPostType === "poll" && (
                <div className="space-y-2">
                  <Input
                    placeholder="Opção 1"
                    value={postData.poll_options[0]}
                    onChange={(e) => onPollOptionChange(0, e.target.value)}
                  />
                  <Input
                    placeholder="Opção 2"
                    value={postData.poll_options[1]}
                    onChange={(e) => onPollOptionChange(1, e.target.value)}
                  />
                </div>
              )}

              {selectedPostType === "campaign" && (
                <Input name="image" placeholder="URL da imagem" value={postData.image} onChange={onInputChange} />
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onPostTypeSelect(null)}>
                  Voltar
                </Button>
                <Button onClick={createPost}>Criar</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface PostTypeOptionProps {
  title: string
  description: string
  onClick: () => void
}

function PostTypeOption({ title, description, onClick }: PostTypeOptionProps) {
  return (
    <div className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex justify-center mt-8">
        <div className="w-40 h-40 opacity-20">
          <svg viewBox="0 0 200 200">
            {/* SVG content based on the title */}
            {title.includes("campanha") && (
              <>
                <line x1="100" y1="40" x2="100" y2="160" stroke="#555" strokeWidth="4" />
                <polygon points="100,40 160,60 160,100 100,80" fill="#555" />
              </>
            )}
            {title.includes("enquete") && (
              <>
                <rect x="40" y="120" width="120" height="40" fill="#555" />
                <circle cx="60" cy="100" r="15" fill="#555" />
                <circle cx="100" cy="100" r="15" fill="#555" />
                <circle cx="140" cy="100" r="15" fill="#555" />
              </>
            )}
            {title.includes("denúncia") && (
              <>
                <polygon points="100,40 160,160 40,160" fill="#555" />
                <text x="100" y="120" fontSize="60" textAnchor="middle" fill="#fff">
                  !
                </text>
              </>
            )}
            {title.includes("Anunciar") && (
              <>
                <path d="M60,80 L100,50 L100,150 L60,120 Z" fill="#555" />
                <rect x="40" y="80" width="25" height="40" fill="#555" />
                <path
                  d="M100,70 C140,70 150,40 160,40 M100,130 C140,130 150,160 160,160"
                  stroke="#555"
                  strokeWidth="4"
                  fill="none"
                />
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}
