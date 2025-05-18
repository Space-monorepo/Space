import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import { fetchUserProfile } from "@/app/api/src/services/userService";
import getTokenFromCookies from "@/app/api/src/controllers/getTokenFromCookies";

interface UsePostActionsProps {
  onSuccess?: () => void;
  onError?: (error: Error | unknown) => void;
}

interface BasePostData {
  title: string;
  content: string;
  files?: File[];
}

interface AnnouncementData extends BasePostData {
  tags: string[];
}

type CampaignData = BasePostData;

interface PollData extends BasePostData {
  options: string[];
  endDate: string;
}

type ComplaintData = BasePostData;

const usePostActions = ({ onSuccess, onError }: UsePostActionsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);

const getBasePostData = async () => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("Token não encontrado nos cookies");

  const user = await fetchUserProfile(token);
  if (!user.id) throw new Error("ID do usuário não encontrado");

  // Verifica se há comunidades vinculadas
  const communityId = user.communities?.[0]?.id || ""; // <- valor de fallback

  return {
    token,
    user,
    basePayload: {
      user_id: user.id,
      community_id: communityId,
    },
  };
};

  const createAnnouncement = async (data: AnnouncementData) => {
    setIsLoading(true);
    try {
      const { token, basePayload } = await getBasePostData();

      const formData = new FormData();
      Object.entries({
        ...basePayload,
        type_post: "announcement",
        title: data.title,
        content: data.content,
        tags: JSON.stringify(data.tags),
      }).forEach(([key, value]) => formData.append(key, value));

      if (data.files) {
        data.files.forEach((file) => formData.append("files", file));
      }

      const response = await axios.post(
        `${API_URL}/posts/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess?.();
      return response.data;
    } catch (error) {
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (data: CampaignData) => {
    setIsLoading(true);
    try {
      const { token, basePayload } = await getBasePostData();

      const formData = new FormData();
      Object.entries({
        ...basePayload,
        type_post: "campaign",
        title: data.title,
        content: data.content,
      }).forEach(([key, value]) => formData.append(key, value));

      if (data.files) {
        data.files.forEach((file) => formData.append("files", file));
      }

      const response = await axios.post(
        `${API_URL}/posts/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess?.();
      return response.data;
    } catch (error) {
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createPoll = async (data: PollData) => {
    setIsLoading(true);
    try {
      const { token, basePayload } = await getBasePostData();

      const response = await axios.post(
        `${API_URL}/posts/create-post`,
        {
          ...basePayload,
          type_post: "poll",
          title: data.title,
          content: data.content,
          poll_options: JSON.stringify(data.options),
          end_date: data.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess?.();
      return response.data;
    } catch (error) {
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createComplaint = async (data: ComplaintData) => {
    setIsLoading(true);
    try {
      const { token, basePayload } = await getBasePostData();

      const formData = new FormData();
      Object.entries({
        ...basePayload,
        type_post: "complaint",
        title: data.title,
        content: data.content,
      }).forEach(([key, value]) => formData.append(key, value));

      if (data.files) {
        data.files.forEach((file) => formData.append("files", file));
      }

      const response = await axios.post(
        `${API_URL}/posts/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess?.();
      return response.data;
    } catch (error) {
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createAnnouncement,
    createCampaign,
    createPoll,
    createComplaint,
  };
};

export default usePostActions;
