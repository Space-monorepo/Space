"use client"

import Sidebar from "@/components/ui/sidebar"

export function SettingsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar variant="static" />

      <main className="flex-1 pl-64 transition-all duration-300 ease-in-out">
        <div className="bg-white shadow-sm p-8 py-12 w-full h-full">
          {children}
        </div>
      </main>
    </div>
  )
}
