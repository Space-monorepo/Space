// src/controllers/userController.ts
import { fetchUserProfile } from "../services/userService";

export const loadUserProfile = async (token: string) => {
  try {
    const data = await fetchUserProfile(token);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error('Erro ao carregar os dados do perfil: ' + err.message);
    } else {
      throw new Error('Erro ao carregar os dados do perfil: Erro desconhecido');
    }
  }
};
