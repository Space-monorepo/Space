'use client';

import { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import axios from 'axios';
import getTokenFromCookies from '@/app/api/src/controllers/getTokenFromCookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

// Função para fazer upload para o Cloudinary
const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.error('Cloudinary Cloud Name não está configurado.');
    return null;
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Erro ao enviar para o Cloudinary');

    const data = await response.json();
    return data.secure_url; // Retorna a URL segura da imagem
  } catch (error) {
    console.error('Erro no upload para Cloudinary:', error);
    return null;
  }
};

// Interface para as props
interface FilePickerProps {
  currentImageUrl?: string;
  onImageChange: (newImageUrl: string) => void;
  isOwnProfile: boolean;
}

const FilePicker = ({ currentImageUrl, onImageChange, isOwnProfile }: FilePickerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Função para disparar o file input ao clicar na área
  const triggerFileInput = () => {
    if (isOwnProfile && fileInputRef.current && !loading) {
      fileInputRef.current.value = ''; // Permite selecionar o mesmo arquivo novamente
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      // Faz o upload da imagem para Cloudinary
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) throw new Error('Erro ao obter URL da imagem');

      console.log('URL da imagem no Cloudinary:', imageUrl);

      // Envia a URL da imagem para o backend
      const token = getTokenFromCookies();
      if (!token) throw new Error('Token não encontrado');

      console.log('Enviando URL da imagem para o backend...');
      console.log('Token:', token);

      const response = await axios.patch(
        `${API_URL}/users/me`,
        { profile_image_url: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.profile_image_url) {
        onImageChange(response.data.profile_image_url); // Atualiza a imagem no frontend
      }
    } catch (error) {
      console.error('Erro no processo de upload:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={triggerFileInput}
        className={`w-full h-48 bg-gray-100 rounded-lg overflow-hidden
          ${isOwnProfile ? 'cursor-pointer hover:bg-gray-200' : 'cursor-default'}
          relative flex items-center justify-center`}
      >
        {currentImageUrl ? (
          <img
            src={currentImageUrl}
            alt="Foto de perfil"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">
            {isOwnProfile ? 'Clique para adicionar foto' : 'Sem foto'}
          </div>
        )}

        {/* Overlay de upload */}
        {isOwnProfile && (
          <div
            className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30
            transition-all duration-300 flex items-center justify-center
            ${loading ? 'bg-opacity-30' : ''}`}
          >
            {loading ? (
              <Loader2 className="animate-spin text-white w-8 h-8" />
            ) : (
              <Upload className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 transition-opacity" />
            )}
          </div>
        )}
      </div>

      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
        tabIndex={-1}
      />
    </div>
  );
};

export default FilePicker;
