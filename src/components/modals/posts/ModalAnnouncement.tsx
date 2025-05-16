"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SimpleFilePicker from "@/components/ui/SimpleFilePicker";
import usePostActions from "@/app/api/hooks/usePostActions";
import { AnnouncementData } from "@/app/api/src/types/posts/posts";

export const ModalAnnouncement: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [announcementData, setAnnouncementData] = useState<AnnouncementData>({
    title: "",
    content: "",
    files: [],
    tags: []
  });

  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!announcementData.tags.includes(newTag.trim())) {
        setAnnouncementData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setAnnouncementData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileChange = (files: File[]) => {
    setAnnouncementData(prev => ({ ...prev, files }));
  };
  const { createAnnouncement } = usePostActions({
    onSuccess: () => {
      onClose?.();
      // TODO: Adicionar toast de sucesso
    },
    onError: (error: unknown) => {
      const errorMessage = (error && typeof error === "object" && "message" in error)
        ? (error as { message?: string }).message
        : "Erro desconhecido";
      console.error('Erro ao enviar anúncio:', errorMessage);
      // TODO: Adicionar toast de erro
    },
  });

  const handleSubmit = async () => {
    try {
      await createAnnouncement(announcementData);
    } catch {
      // O erro já será tratado pelo hook
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h2 className="text-xl font-semibold mb-6">Novo Anúncio</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título do anúncio
            </label>
            <Input
              value={announcementData.title}
              onChange={(e) => setAnnouncementData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Digite um título atrativo"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo
            </label>
            <Textarea
              value={announcementData.content}
              onChange={(e) => setAnnouncementData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Descreva seu anúncio..."
              className="w-full min-h-[200px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {announcementData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Digite tags e pressione Enter"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagens (opcional)
            </label>            <SimpleFilePicker
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!announcementData.title || !announcementData.content}
          >
            Publicar Anúncio
          </Button>
        </div>
      </div>
    </div>
  );
};
