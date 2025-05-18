import { useState, useEffect, useCallback } from 'react';
import { Community } from '../../types/community/Community';
import { fetchAllCommunities } from '../../src/services/community/communityService';
import getTokenFromCookies from '../../src/controllers/getTokenFromCookies';

interface UseCommunityActionsOutput {
  communities: Community[];
  loading: boolean;
  error: Error | null;
  fetchCommunities: () => Promise<void>;
}

const useCommunityActions = (): UseCommunityActionsOutput => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const token = getTokenFromCookies();

  const fetchCommunitiesCallback = useCallback(async () => {
    if (!token) {
      setError(new Error('Token não encontrado. Usuário não autenticado.'));
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllCommunities(token);
      setCommunities(data);
    } catch (err) {
      setError(err as Error);
      console.error("Erro ao buscar comunidades:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCommunitiesCallback();
  }, [fetchCommunitiesCallback]);

  return { communities, loading, error, fetchCommunities: fetchCommunitiesCallback };
};

export default useCommunityActions;
