export interface Community {
  id: string;
  name: string;
  description?: string;
  memberCount?: number;
  type_community:
    | "university"
    | "neighborhood"
    | "company"
    | "government"
    | "healthcare"
    | "religious"
    | "commercial"
    | "club";
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
}

export interface CommunityMembers {
  id: string;
  user_id: string;
  community_id: string;
  role: string;
  createdAt?: string;
}

export interface CommunityListCommunities {
  current_limit: 10;
  current_offset: 0;
  has_more: false;
  items: [];
  total: 0;
}
