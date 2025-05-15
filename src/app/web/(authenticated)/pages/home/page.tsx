"use client";

import { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import { useCheckTokenValidity } from "@/app/api/src/controllers/authCheckToken";
import PostsList from "./components/postsList";
import Header from "../../../../../components/ui/header";
import CreatePostModal from "./components/CreatePostModal";
import { postsData } from "./components/postsData";
import { RightSidebar } from "@/components/ui/Rightsidebar";

export default function HomePage() {
  useCheckTokenValidity();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("geral");
  const [selectedPostType, setSelectedPostType] = useState<string | null>(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
    poll_options: ['', '']
  });

  const handlePostTypeSelect = (type: string | null) => setSelectedPostType(type);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  };

  const handlePollOptionChange = (index: number, value: string) => {
    setPostData(prev => ({
      ...prev,
      poll_options: prev.poll_options.map((option, i) => i === index ? value : option)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <Sidebar variant="static" />

      {/* Main content and right sidebar */}
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-4 max-w-4xl mx-auto">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} openModal={() => setIsCreateModalOpen(true)} />
          <div className="overflow-y-auto no-scrollbar" style={{ maxHeight: 'calc(100vh - 150px)' }}>
            <PostsList posts={postsData.map(post => ({
              ...post,
              id: String(post.id),
              imageType: ["people", "warning", "flag", "megaphone"].includes(post.imageType)
                ? post.imageType as "people" | "warning" | "flag" | "megaphone"
                : null
            }))} />
          </div>
          <CreatePostModal 
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            selectedPostType={selectedPostType}
            onPostTypeSelect={handlePostTypeSelect}
            postData={postData}
            onInputChange={handleInputChange}
            onPollOptionChange={handlePollOptionChange}
          />
        </main>

        {/* Right Sidebar */}
        <div className="w-80 p-4 hidden lg:block">
          <RightSidebar 
            campaigns={[]} 
            discussions={[]} 
            agendaItems={[]} 
          />
        </div>
      </div>
    </div>
  );
}
