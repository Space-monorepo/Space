import { Calendar, Mail } from "lucide-react";
import FilePicker from "@/components/ui/FilePicker";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  name: string;
  email: string;
  created_at: string;
  bio?: string;
  reputation?: string;
  popularity?: number;
  profile_image_url?: string;
}

interface UserProfileCardProps {
  user: User | null;
  isOwnProfile: boolean;
  onImageChange: (newImageUrl: string) => void;
}

export default function UserProfileCard({ user, isOwnProfile, onImageChange }: UserProfileCardProps) {
  return (
    <div className="w-80 p-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <FilePicker
            currentImageUrl={user?.profile_image_url || ''}
            onImageChange={onImageChange}
            isOwnProfile={isOwnProfile}
          />
        </div>

        <div className="p-4">
          <h1 className="text-xl font-bold">{user?.name || "Carregando..."}</h1>
          <p className="text-gray-500 text-sm">@{user?.username || "..."}</p>
          {!isOwnProfile && (
            <Button className="w-full mt-3 bg-black text-white hover:bg-black/90">Conectar-se</Button>
          )}
          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{user ? `Desde ${new Date(user.created_at).toLocaleDateString()}` : "..."}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{user?.email || "..."}</span>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="font-medium text-sm mb-2">Bio</h3>
            <p className="text-sm text-gray-600">
              {user?.bio || "Esse usuário ainda não escreveu uma bio."}
            </p>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between text-sm mb-2">
              <h3 className="font-medium">Reputação</h3>
              <span className="text-gray-500">{user?.reputation || "Colaborador"}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Sub-observação</span>
              <span>Ajudante</span>
              <span>Colaborador</span>
              <span>Líder</span>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="font-medium text-sm mb-2">Popularidade</h3>
            <div className="text-3xl font-bold">{user?.popularity || "0"}</div>
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="font-medium text-sm mb-2">Conquistas</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span>Líder</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}