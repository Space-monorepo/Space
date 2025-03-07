import Image from 'next/image'
import Link from 'next/link'
import { Home, Search, List, Settings } from 'lucide-react'

export default function Sidebar(){
    return(
        <aside className="w-64 bg-white border-r-0 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b-gray-300">
          <Link href="/home" className="flex items-center space-x-2">
            <Image src="/Vector.svg" alt="Space Logo" width={24} height={24} className="w-6 h-6" />
            <Image src="/space escrita.svg" alt="Space" width={96} height={24} className="w-24 h-6" />
            {/* <span className="font-semibold text-lg">SPACE</span> */}
          </Link>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-400 mb-4">GENERAL</p>
            <nav className="space-y-1">
              <Link href="/home" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/pesquisar"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Search className="w-5 h-5" />
                <span>Pesquisar</span>
              </Link>
              <Link
                href="/comunidades"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <List className="w-5 h-5" />
                <span>Comunidades</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t-gray-300 p-4 space-y-4">
          <Link
            href="/configuracoes"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Settings className="w-5 h-5" />
            <span>Configurações</span>
          </Link>

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
            <div className="flex flex-col">
              <span className="text-sm font-medium">Joao123</span>
              <span className="text-xs text-gray-500">@josesilva</span>
            </div>
          </div>
        </div>
      </aside>
    )
}