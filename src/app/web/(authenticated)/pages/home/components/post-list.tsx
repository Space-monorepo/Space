"use client"

import { useState } from "react"
import { Bookmark, EllipsisVerticalIcon as OverflowMenuVertical, ArrowUp, MessageSquare, Activity } from "lucide-react"

type Post = {
  id: number
  author: string
  avatar: string
  role: string
  location: string
  type: string
  time: string
  title: string
  content: string
  image: string
  likes: number
  comments: number
  shares: number
  bookmarked: boolean
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Felipe Sousa",
      avatar: "/ProfilePic1.svg",
      role: "Líder",
      location: "PUC - Campinas",
      type: "Anúncio",
      time: "2h",
      title: "Anúncio oficial da comunidade",
      content: `Prezados membros,

Informamos que, a partir do dia 22 de abril, o sistema de chat da plataforma passará por uma manutenção programada para melhorias de performance e segurança. Durante o período de atualização, que ocorrerá entre 22h e 04h, as funcionalidades de envio de mensagens e notificações estarão temporariamente indisponíveis. A moderação seguirá funcionando normalmente, bem como o acesso ao feed e às campanhas. Recomendamos que, caso haja alguma comunicação importante a ser feita durante esse horário, ela seja agendada com antecedência. Pedimos a compreensão de todos, pois essas melhorias são essenciais para garantir uma experiência mais estável e segura para a comunidade. Em caso de dúvidas, entre em contato com o suporte pela aba "Ajuda". Agradecemos pela colaboração.

Atenciosamente,
Equipe de Administração da Comunidade`,
      image: "/placeholder.svg?height=200&width=500",
      likes: 350,
      comments: 52,
      shares: 89,
      bookmarked: false,
    },
    {
      id: 2,
      author: "Briann Gomes",
      avatar: "/ProfilePic2.svg",
      role: "Líder",
      location: "PUC - Campinas",
      type: "Denúncia",
      time: "2h",
      title: "Desrespeito recorrente ao horário das aulas",
      content: `Gostaria de registrar uma denúncia em relação a um grupo de alunos que tem interrompido repetidamente o início das aulas da turma de Engenharia de Software, no período noturno. Nas últimas duas semanas, esses estudantes chegam com atraso, fazem barulho na entrada da sala e interrompem professores e colegas que já estão concentrados no`,
      image: "",
      likes: 24,
      comments: 8,
      shares: 3,
      bookmarked: false,
    },
      {
      id: 3,
      author: "Felipe Sousa",
      avatar: "/ProfilePic3.svg",
      role: "Líder",
      location: "PUC - Campinas",
      type: "Anúncio",
      time: "2h",
      title: "Anúncio oficial da comunidade",
      content: `Prezados membros,

Informamos que, a partir do dia 22 de abril, o sistema de chat da plataforma passará por uma manutenção programada para melhorias de performance e segurança. Durante o período de atualização, que ocorrerá entre 22h e 04h, as funcionalidades de envio de mensagens e notificações estarão temporariamente indisponíveis. A moderação seguirá funcionando normalmente, bem como o acesso ao feed e às campanhas. Recomendamos que, caso haja alguma comunicação importante a ser feita durante esse horário, ela seja agendada com antecedência. Pedimos a compreensão de todos, pois essas melhorias são essenciais para garantir uma experiência mais estável e segura para a comunidade. Em caso de dúvidas, entre em contato com o suporte pela aba "Ajuda". Agradecemos pela colaboração.

Atenciosamente,
Equipe de Administração da Comunidade`,
      image: "/placeholder.svg?height=200&width=500",
      likes: 350,
      comments: 52,
      shares: 89,
      bookmarked: false,
    },
  ])

  const toggleBookmark = (id: number) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, bookmarked: !post.bookmarked } : post)))
  }

  return (
    <div className="flex-1 p-4 overflow-auto pr-72 flex justify-center">
      <div className="w-full max-w-2xl space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-md border border-[#e0e0e0] overflow-hidden">
            <div className="p-4">
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.avatar || "/placeholder.svg"}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{post.author}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#525252]"></div>
                      <span className="text-xs px-2 py-0.5 bg-[#393939] text-white rounded">{post.role}</span>
                    </div>
                    <div className="flex items-center text-xs text-[#525252]">
                      <span>{post.type}</span>
                      <span className="mx-1">•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#525252]">{post.location}</span>
                  <button onClick={() => toggleBookmark(post.id)} className="p-1 hover:bg-[#f4f4f4] rounded-full">
                    <Bookmark
                      className={`h-5 w-5 ${post.bookmarked ? "fill-[#0f62fe] text-[#0f62fe]" : "text-[#525252]"}`}
                    />
                  </button>
                  <button className="p-1 hover:bg-[#f4f4f4] rounded-full">
                    <OverflowMenuVertical className="h-5 w-5 text-[#525252]" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="mt-4">
                <h2 className="text-xl font-medium mb-2">{post.title}</h2>
                <p className="text-[#161616] whitespace-pre-line">{post.content}</p>
                {post.image && (
                  <div className="mt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full rounded" />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-6 mt-4 text-[#525252]">
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
          </div>
        ))}
      </div>
    </div>
  )
}
