"use client"

import Sidebar from "@/components/ui/sidebar"
import RightSidebar from "@/components/ui/Rightsidebar"
import Header from "@/components/ui/header"
import PostList from "./components/post-list"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-[#161616]">
      <Sidebar variant="static" />
      <div className="ml-64">
        <Header />
        <main className="flex flex-1 pt-16 no-scrollbar">
          <PostList />
          <RightSidebar />
        </main>
      </div>
    </div>
  )
}
