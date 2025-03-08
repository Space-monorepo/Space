'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Home, Search, List, Settings, MessageSquare, Trophy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside
      className="w-24 hover:w-64 bg-white border border-gray-200 flex flex-col transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Logo */}
      <div className="p-4 px-6.5 border-b border-gray-200">
        <Link href="/home" className="flex items-center space-x-2">
          <Image src="/Vector.svg" alt="Space Logo" width={24} height={24} />
          <Image
            src="/space-escrita.svg"
            alt="Space-escrita"
            width={96}
            height={24}
            className={cn('w-24 h-6', isOpen ? 'block' : 'hidden')}
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col">
        <div className="p-4">
          <p className={cn('text-xs font-semibold text-gray-400 mb-4', isOpen ? 'block' : 'hidden')}>
            GENERAL
          </p>
          <nav className="space-y-1">
            <Link
              href="/home"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                isActive('/home') ? 'bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className={isOpen ? 'block' : 'hidden'}>Home</span>
            </Link>
            <Link
              href="/pesquisar"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                isActive('/pesquisar') ? 'bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className={isOpen ? 'block' : 'hidden'}>Pesquisar</span>
            </Link>
            <Link
              href="/comunidades"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                isActive('/comunidades') ? 'bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
              <span className={isOpen ? 'block' : 'hidden'}>Comunidades</span>
            </Link>
            <Link
              href="/mensagens"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                isActive('/mensagens') ? 'bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className={isOpen ? 'block' : 'hidden'}>Mensagens</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-4 space-y-4">
            <Link
              href="/gamificacao"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                isActive('/gamificacao') ? 'bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span className={isOpen ? 'block' : 'hidden'}>Gamificação</span>
            </Link>
        <Link
          href="/settings"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            isActive('/configuracoes') ? 'bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className={isOpen ? 'block' : 'hidden'}>Configurações</span>
        </Link>

        {/* User Profile */}
        <div className="flex items-center space-x-3 px-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Profile picture"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={cn('flex-col', isOpen ? 'block' : 'hidden')}>
            <span className="text-sm font-medium">Joao123</span>
            <span className="text-xs text-gray-500">@josesilva</span>
          </div>
        </div>
      </div>
    </aside>
  )
}