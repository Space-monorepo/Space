import { Calendar, TrendingUp } from "lucide-react"

export default function RightSidebar() {
  return (
    <div className="w-72 border-l my-10 border-[#e0e0e0] bg-gray-100 p-4 hidden lg:block fixed right-0 top-16 bottom-0 overflow-y-auto z-[5]">
      <div className="space-y-6">
        {/* Minhas Campanhas */}
        <div>
          <h3 className="font-medium mb-3">Minhas Campanhas</h3>
          <div className="space-y-2">
            <div className="p-3 bg-[#E0E0E0] rounded flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-md">📄</span>
              </div>
              <span className="text-sm">Salgado acessível</span>
            </div>
            <div className="p-3 bg-[#E0E0E0] rounded flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-md">📄</span>
              </div>
              <span className="text-sm">Refrigeração nas salas</span>
            </div>
          </div>
        </div>

        {/* Em discussão agora */}
        <div>
          <h3 className="font-medium mb-3">Em discussão agora</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 hover:bg-[#f4f4f4] rounded">
              <TrendingUp className="h-4 w-4 text-[#525252]" />
              <span className="text-sm">Salgado caro demais</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#f4f4f4] rounded">
              <TrendingUp className="h-4 w-4 text-[#525252]" />
              <span className="text-sm">Maçanetas fechado</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#f4f4f4] rounded">
              <TrendingUp className="h-4 w-4 text-[#525252]" />
              <span className="text-sm">Ar-condicionado</span>
            </div>
          </div>
        </div>

        {/* Agenda Comunitária */}
        <div>
          <h3 className="font-medium mb-3">Agenda Comunitária</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 hover:bg-[#f4f4f4] rounded">
              <Calendar className="h-4 w-4 text-[#525252]" />
              <span className="text-sm">Festa do 83 anos da PUC</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#f4f4f4] rounded">
              <Calendar className="h-4 w-4 text-[#525252]" />
              <span className="text-sm">Churrasco universitário</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#f4f4f4] rounded">
              <Calendar className="h-4 w-4 text-[#525252]" />
              <span className="text-sm">Ação social</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
