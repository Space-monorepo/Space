export interface Community {
  id: string; // Ou number, dependendo da sua API
  name: string;
  description?: string;
  memberCount?: number;
  imageUrl?: string;
}
