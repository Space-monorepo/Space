"use client"

import Sidebar from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookmarkIcon, MoreHorizontal, TrendingUp, MessageSquare, Clock } from "lucide-react"
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken"



// Mock data for posts
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
    time: "45 min",
    image: "/placeholder.svg?height=40&width=40",
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
    time: "2 h",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Título da Publicação",
    content:
      "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    upvotes: 102,
    comments: 0,
    location: "Sidi",
    tag: "Denúncia",
    tagColor: "red",
    time: "5 h",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Título da Publicação",
    content:
      "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    upvotes: 350,
    comments: 89,
    location: "PUC - Campinas",
    tag: "Enquete",
    tagColor: "orange",
    time: "3 d",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function HomePage() {

  useCheckTokenValidity();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex p-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookmarkIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{post.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{post.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments === 0 ? "Sem interações" : post.comments}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span>{post.location}</span>
                  <Badge
                    className={`
                      ${post.tagColor === "blue" && "bg-blue-100 text-blue-800 hover:bg-blue-100"}
                      ${post.tagColor === "gray" && "bg-gray-100 text-gray-800 hover:bg-gray-100"}
                      ${post.tagColor === "red" && "bg-red-100 text-red-800 hover:bg-red-100"}
                      ${post.tagColor === "orange" && "bg-orange-100 text-orange-800 hover:bg-orange-100"}
                    `}
                  >
                    {post.tag}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

