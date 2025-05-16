"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SimpleFilePicker from "@/components/ui/SimpleFilePicker";
import usePostActions from "@/app/api/hooks/usePostActions";
import { PollData } from "@/app/api/src/types/posts/posts";

// Interfaces moved to types/posts.ts

export const ModalPoll: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [pollData, setPollData] = useState<PollData>({
    title: "",
    question: "",
    options: [
      { id: 1, text: "" },
      { id: 2, text: "" }
    ],
    files: [],
    endDate: ""
  });

  const handleAddOption = () => {
    if (pollData.options.length < 5) {
      setPollData(prev => ({
        ...prev,
        options: [...prev.options, { id: Date.now(), text: "" }]
      }));
    }
  };

  const handleRemoveOption = (id: number) => {
    if (pollData.options.length > 2) {
      setPollData(prev => ({
        ...prev,
        options: prev.options.filter(option => option.id !== id)
      }));
    }
  };

  const handleOptionChange = (id: number, text: string) => {
    setPollData(prev => ({
      ...prev,
      options: prev.options.map(option =>
        option.id === id ? { ...option, text } : option
      )
    }));
  };

  const handleFileChange = (files: File[]) => {
    setPollData(prev => ({ ...prev, files }));
  };
  const { createPoll } = usePostActions({
    onSuccess: () => {
      onClose?.();
      // TODO: Adicionar toast de sucesso
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : "Erro desconhecido";
      console.error('Erro ao enviar enquete:', message);
      // TODO: Adicionar toast de erro
    },
  });

  const handleSubmit = async () => {
    try {
      // Remove 'content' if it is not required by PollData, or ensure it is always a string
      const { content, ...restPollData } = pollData as PollData & { content?: string };
      await createPoll({
        ...restPollData,
        ...(typeof content === "string" ? { content } : { content: "" }),
        options: pollData.options.map(opt => opt.text).filter(text => text.trim()),
      });
    } catch {
      // O erro já será tratado pelo hook
    }
  };

  const isValid = pollData.question &&
    pollData.options.every(option => option.text.trim()) &&
    pollData.endDate;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h2 className="text-xl font-semibold mb-6">Nova Enquete</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pergunta
            </label>
            <Input
              value={pollData.question}
              onChange={(e) => setPollData(prev => ({ ...prev, question: e.target.value }))}
              placeholder="Digite sua pergunta"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opções de resposta
            </label>
            <div className="space-y-2">
              {pollData.options.map((option) => (
                <div key={option.id} className="flex gap-2">
                  <Input
                    value={option.text}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    placeholder="Digite uma opção"
                    className="w-full"
                  />
                  {pollData.options.length > 2 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveOption(option.id)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              {pollData.options.length < 5 && (
                <Button
                  variant="outline"
                  onClick={handleAddOption}
                  className="w-full mt-2"
                >
                  + Adicionar opção
                </Button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de encerramento
            </label>
            <Input
              type="datetime-local"
              value={pollData.endDate}
              onChange={(e) => setPollData(prev => ({ ...prev, endDate: e.target.value }))}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem (opcional)
            </label>            <SimpleFilePicker
              onChange={handleFileChange}
              accept="image/*"
              multiple={false}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Criar Enquete
          </Button>
        </div>
      </div>
    </div>
  );
};
