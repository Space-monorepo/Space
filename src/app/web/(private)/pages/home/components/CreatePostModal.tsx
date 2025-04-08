import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { API_URL } from "@/config";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPostType: string | null;
  onPostTypeSelect: (type: string | null) => void;
  postData: {
    title: string;
    content: string;
    image?: string;
    poll_options: string[];
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPollOptionChange: (index: number, value: string) => void;
}

export default function CreatePostModal({ isOpen, onClose, selectedPostType, onPostTypeSelect, postData, onInputChange, onPollOptionChange }: CreatePostModalProps) {
  
  const createPost = async () => {
    try {
      const communityId = 'your-community-id';
      const userId = 'current-user-id';

      const postPayload = {
        community_id: communityId,
        user_id: userId,
        type_post: "campaign",
        title: postData.title,
        content: postData.content,
        image: postData.image || "",
        poll_options: postData.poll_options.filter(option => option.trim() !== ""),
        total_likes: 0,
        comments: [],
        status: "pending"
      };

      const response = await axios.post(`${API_URL}/posts`, postPayload);

      onPostTypeSelect(null);
      onClose();
      console.log('Post criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 bg-gray-100">
        <DialogTitle/>
        <DialogDescription className="text-center text-lg font-semibold mb-4">
          O que você gostaria de fazer?
        </DialogDescription>
        {!selectedPostType ? (
          <div className="grid grid-cols-2 gap-4 p-6">
            <PostTypeOption title="Iniciar uma nova campanha" description="Mobilize sua comunidade em uma causa ou ação coletiva. Arrecade fundos, organize mutirões e faça diferença juntos!" onClick={() => onPostTypeSelect('campaign')} />
            <PostTypeOption title="Lance uma enquete" description="Quer saber a opinião de todos? Crie uma enquete rápida e tome decisões em conjunto." onClick={() => onPostTypeSelect('poll')} />
            <PostTypeOption title="Registrar uma denúncia" description="Encontrou algo inadequado? Nos ajude a manter o ambiente seguro e respeitoso para todos." onClick={() => onPostTypeSelect('report')} />
            <PostTypeOption title="Anunciar" description="Divulgue oportunidades, eventos ou qualquer novidade. Alcance toda a comunidade de forma simples e rápida!" onClick={() => onPostTypeSelect('ad')} />
          </div>
        ) : (
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>
                {selectedPostType === 'campaign' && 'Iniciar uma nova campanha'}
                {selectedPostType === 'poll' && 'Criar uma nova enquete'}
                {selectedPostType === 'ad' && 'Fazer um novo anúncio'}
                {selectedPostType === 'report' && 'Registrar uma denúncia'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <Input 
                name="title"
                placeholder="Título"
                value={postData.title}
                onChange={onInputChange}
              />
              
              <Textarea 
                name="content"
                placeholder="Descrição"
                value={postData.content}
                onChange={onInputChange}
              />
              
              {selectedPostType === 'poll' && (
                <div className="space-y-2">
                  <Input 
                    placeholder="Opção 1"
                    value={postData.poll_options[0]}
                    onChange={(e) => onPollOptionChange(0, e.target.value)}
                  />
                  <Input 
                    placeholder="Opção 2"
                    value={postData.poll_options[1]}
                    onChange={(e) => onPollOptionChange(1, e.target.value)}
                  />
                </div>
              )}

              {selectedPostType === 'campaign' && (
                <Input 
                  name="image"
                  placeholder="URL da imagem"
                  value={postData.image}
                  onChange={onInputChange}
                />
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onPostTypeSelect(null)}>Voltar</Button>
                <Button onClick={createPost}>Criar</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface PostTypeOptionProps {
  title: string;
  description: string;
  onClick: () => void;
}

function PostTypeOption({ title, description, onClick }: PostTypeOptionProps) {
  return (
    <div className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex justify-center mt-8">
        <div className="w-40 h-40 opacity-20">
          <svg viewBox="0 0 200 200">
            {/* SVG content based on the title */}
          </svg>
        </div>
      </div>
    </div>
  );
}