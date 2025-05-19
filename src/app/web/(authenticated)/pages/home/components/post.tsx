import { Bookmark, MoreHorizontal } from "lucide-react"
import Image from "next/image"

function PostImage({ imageType }: { imageType: "flag" | "megaphone" | "people" | "warning" | null }) {
  switch (imageType) {
    case "flag":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <line x1="30" y1="20" x2="30" y2="80" stroke="#555" strokeWidth="3" />
          <polygon points="30,20 70,30 70,50 30,40" fill="#3B82F6" />
        </svg>
      )
    case "megaphone":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M30,40 L50,25 L50,75 L30,60 Z" fill="#EF4444" />
          <rect x="20" y="40" width="15" height="20" fill="#EF4444" />
          <path d="M50,35 C70,35 75,20 80,20 M50,65 C70,65 75,80 80,80" stroke="#EF4444" strokeWidth="3" fill="none" />
        </svg>
      )
    case "people":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="20" y="50" width="60" height="30" fill="#D1D5DB" />
          <circle cx="30" cy="40" r="10" fill="#D1D5DB" />
          <circle cx="50" cy="40" r="10" fill="#D1D5DB" />
          <circle cx="70" cy="40" r="10" fill="#D1D5DB" />
        </svg>
      )
    case "warning":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <polygon points="50,20 80,80 20,80" fill="#FBBF24" stroke="#EF4444" strokeWidth="2" />
          <text x="50" y="65" fontSize="30" textAnchor="middle" fill="#EF4444">
            !
          </text>
        </svg>
      )
    default:
      return null
  }
}

// Removendo propriedades não utilizadas
interface PostProps {
  id: number | string
  title: string
  content: string
  upvotes: number
  comments: number
  views: number
  imageType: "flag" | "megaphone" | "people" | "warning" | null
  author?: {
    name: string
    avatar: string
    role?: string
  }
  time?: string
}

export default function Post({
  title,
  content,
  upvotes,
  comments,
  views,
  imageType,
  author = {
    name: "Felipe Sousa",
    avatar: "/no-profile-pic.png",
    role: "Líder",
  },
  time = "2h",
}: PostProps) {


  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
      {/* Author info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={author.avatar || "/placeholder.svg?height=40&width=40"}
              alt={author.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{author.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {time && <span>{time}</span>}
              <span>{time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {author.role && <span className="bg-black text-white text-xs px-2 py-1 rounded-md">{author.role}</span>}
          <div className="flex items-center">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Post title */}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {/* Post content */}
      <p className="text-gray-600 mb-4 whitespace-pre-line">{content}</p>

      {/* Post image if available */}
      {imageType && (
        <div className="mb-4">
          <div className="bg-gray-800 rounded-md p-4 w-full">
            <div className="flex justify-center">
              <PostImage imageType={imageType} />
            </div>
          </div>
        </div>
      )}

      {/* Post footer */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <span>{upvotes}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{comments}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
