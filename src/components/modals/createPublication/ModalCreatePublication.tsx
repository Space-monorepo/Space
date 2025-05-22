"use client";

import { Dialog } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ModalCampaign } from "../posts/ModalCampaign";
import { ModalComplaint } from "../posts/ModalComplaint";
import { ModalPoll } from "../posts/ModalPoll";
import { ModalAnnouncement } from "../posts/ModalAnnouncement";
import useCommunityActions from "@/app/api/hooks/community/useCommunityActions";

interface ModalCreatePublicationProps {
  isOpen: boolean;
  onClose: () => void;
}

type PublicationType = "campaign" | "complaint" | "poll" | "announcement";

export function ModalCreatePublication({
  isOpen,
  onClose,
}: ModalCreatePublicationProps) {
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [publicationType, setPublicationType] = useState<PublicationType | "">(
    ""
  );
  const [showNextModal, setShowNextModal] = useState(false);

  const {
    communities: fetchedCommunities,
    loading: communitiesLoading,
    error: communitiesError,
    fetchCommunities,
  } = useCommunityActions();

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const publicationTypes = [
    { value: "campaign", label: "Campanha" },
    { value: "complaint", label: "Denúncia" },
    { value: "poll", label: "Enquete" },
    { value: "announcement", label: "Anúncio" },
  ];

  const handleCreate = () => {
    if (selectedCommunity && publicationType) {
      setShowNextModal(true);
    }
  };

  const handleClose = () => {
    setSelectedCommunity("");
    setPublicationType("");
    setShowNextModal(false);
    onClose();
  };
  if (showNextModal) {
    switch (publicationType) {
      case "campaign":
        return <ModalCampaign onClose={handleClose} />;
      case "complaint":
        return <ModalComplaint onClose={handleClose} />;
      case "poll":
        return <ModalPoll onClose={handleClose} />;
      case "announcement":
        return <ModalAnnouncement onClose={handleClose} />;
      default:
        return null;
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {" "}
      <div className="fixed inset-0 bg-[#858585]/80 backdrop-blur-xd flex items-center justify-center">
        <div className="bg-white p-8 w-[800px]">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
            Criar publicação
          </h2>

          <div className="space-y-6">
            <section className="w-full text-sm leading-6">
              <label className="block text-neutral-800 mb-2">
                Selecione a comunidade
              </label>
              <Select
                value={selectedCommunity}
                onValueChange={setSelectedCommunity}
                disabled={communitiesLoading}
              >
                <SelectTrigger className="w-full cursor-pointer bg-neutral-200 text-neutral-500 px-4 py-2 border-none">
                  <SelectValue placeholder="Selecione uma comunidade" />
                </SelectTrigger>
                <SelectContent>
                  {communitiesError && (
                    <>
                      <SelectItem value="error-loading" disabled className="text-red-500">
                        Erro ao carregar comunidades. Tente novamente.
                      </SelectItem>
                    </>
                  )}
                  {!communitiesLoading &&
                    !communitiesError &&
                    fetchedCommunities.length === 0 && (
                      <SelectItem value="no-communities" disabled>
                        Nenhuma comunidade encontrada.
                      </SelectItem>
                    )}
                  {fetchedCommunities.map((community) => (
                    <SelectItem
                      className="bg-white text-black hover:bg-neutral-100"
                      key={community.id}
                      value={community.id}
                    >
                      {community.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>{" "}
            <section className="w-full text-sm leading-6">
              <label className="block text-neutral-800 mb-2">
                Selecione o tipo da publicação
              </label>
              <Select
                value={publicationType}
                onValueChange={(value) =>
                  setPublicationType(value as PublicationType)
                }
              >
                <SelectTrigger className="w-full cursor-pointer bg-neutral-200 text-neutral-500 px-4 py-2 border-none">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  {publicationTypes.map((type) => (
                    <SelectItem
                      className="bg-white text-black hover:bg-neutral-100"
                      key={type.value}
                      value={type.value}
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-neutral-500">
                Selecione o tipo de publicação que melhor se adequa ao seu
                conteúdo
              </p>
            </section>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6 py-2 cursor-pointer text-neutral-800 hover:bg-neutral-100"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!selectedCommunity || !publicationType}
              className="px-6 py-2 cursor-pointer bg-neutral-800 text-white hover:bg-neutral-700 disabled:bg-neutral-400"
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
