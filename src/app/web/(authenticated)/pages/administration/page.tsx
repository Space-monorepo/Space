"use client"

import { Search, MoreHorizontal, ArrowRight } from "lucide-react"
import Sidebar from "@/components/ui/sidebar"
import Link from "next/link"

type Community = {
  id: number
  title: string
  founder: string
  icon: string
  color: string
}

export default function AdministrationPage() {
  const communities: Community[] = [
    {
      id: 1,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "🦐",
      color: "#10b981",
    },
    {
      id: 2,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "💡",
      color: "#ef4444",
    },
    {
      id: 3,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "🎮",
      color: "#4b5563",
    },
    {
      id: 4,
      title: "Título da Comunidade",
      founder: "Nome do Fundador",
      icon: "🌱",
      color: "#ffffff",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#161616]">
      <Sidebar variant="static"/>
      <div className="ml-64">
        <main className="p-8">
          <h1 className="text-2xl font-medium mb-6">Administração</h1>

          {/* Search Bar */}
          <div className="mb-8 max-w-3xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#525252] h-4 w-4" />
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded focus:outline-none focus:border-[#0f62fe]"
              />
            </div>
          </div>

          {/* Communities List */}
          <div className="space-y-2 max-w-3xl">
            {communities.map((community) => (
              <div
                key={community.id}
                className="bg-white hover:bg-[#f8f8f8] rounded-md border border-[#e0e0e0] p-4 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded flex items-center justify-center text-xl`}
                    style={{
                      backgroundColor: community.color === "#ffffff" ? "#f4f4f4" : community.color,
                      border: community.color === "#ffffff" ? "1px solid #e0e0e0" : "none",
                    }}
                  >
                    <span>{community.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{community.title}</h3>
                    <p className="text-sm text-[#525252]">Fundador: {community.founder}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-full hover:bg-[#e5e5e5] opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-5 w-5 text-[#525252]" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-[#e5e5e5]">
                    <Link href={`/administration/id`}>
                    <ArrowRight className="h-5 w-5 text-[#525252]" />
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
