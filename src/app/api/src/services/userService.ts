// src/services/userService.ts
export const fetchUserProfile = async (token: string) => {
  const response = await fetch('http://localhost:8000/users/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao carregar os dados do perfil');
  }

  return response.json();
};
