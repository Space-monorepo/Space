import { API_URL } from '@/config';
import { CommunityListCommunities } from '@/app/api/src/types/community/Community';

export const fetchAllCommunities = async (token: string): Promise<CommunityListCommunities> => {
  console.log("Fetching all communities with token:", token);
  const response = await fetch(`${API_URL}/communities`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao carregar as comunidades' }));
    throw new Error(errorData.message || 'Erro ao carregar as comunidades');
  }

  return response.json();
};
