import { Search } from "@carbon/icons-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openModal: () => void;
}

export default function Header({ openModal }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 sticky top-0 z-10 mb-4">
      <div className="relative w-full max-w-[600px]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-300"
        />
      </div>
      <Button 
        className="bg-zinc-800 hover:bg-zinc-700 text-white"
        onClick={openModal}
      >
        Criar publicação
      </Button>
    </header>
  );
}