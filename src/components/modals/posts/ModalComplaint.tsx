"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SimpleFilePicker from "@/components/ui/SimpleFilePicker";
import usePostActions from "@/app/api/hooks/usePostActions";
import { ComplaintData } from "@/app/api/src/types/posts/posts";

export const ModalComplaint: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [complaintData, setComplaintData] = useState<ComplaintData>({
    title: "",
    content: "",
    files: []
  });

  const handleFileChange = (files: File[]) => {
    setComplaintData(prev => ({ ...prev, files }));
  };
  const { createComplaint } = usePostActions({
    onSuccess: () => {
      onClose?.();
      // TODO: Adicionar toast de sucesso
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        console.error('Erro ao enviar denúncia:', (error as { message: string }).message);
      } else {
        console.error('Erro ao enviar denúncia:', error);
      }
      // TODO: Adicionar toast de erro
    },
  });

  const handleSubmit = async () => {
    try {
      await createComplaint(complaintData);
    } catch {
      // O erro já será tratado pelo hook
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h2 className="text-xl font-semibold mb-6">Nova Denúncia</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título da denúncia
            </label>
            <Input
              value={complaintData.title}
              onChange={(e) => setComplaintData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Digite um título claro e objetivo"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição detalhada
            </label>
            <Textarea
              value={complaintData.content}
              onChange={(e) => setComplaintData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Descreva a situação em detalhes..."
              className="w-full min-h-[200px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evidências (opcional)
            </label>            <SimpleFilePicker
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
              multiple
            />
            <p className="text-xs text-gray-500 mt-1">
              Você pode anexar imagens, PDFs ou documentos que ajudem a comprovar sua denúncia
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!complaintData.title || !complaintData.content}
          >
            Enviar Denúncia
          </Button>
        </div>
      </div>
    </div>
  );
};
