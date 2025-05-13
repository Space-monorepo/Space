import type React from "react"
import Post from "./post"

interface PostData {
  id: string
  title: string
  content: string
  upvotes: number
  comments: number
  location: string
  tag: string
  tagColor: string
  views: number
  imageType: "flag" | "megaphone" | "people" | "warning" | null
  author?: {
    name: string
    avatar: string
    role?: string
  }
  time?: string
}

interface PostsListProps {
  posts: PostData[]
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

export default PostsList
