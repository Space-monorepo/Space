export interface BasePostData {
  title: string;
  content: string;
  files?: File[];
}

export interface AnnouncementData extends BasePostData {
  tags: string[];
}

export interface CampaignData extends BasePostData {}

export interface PollOption {
  id: number;
  text: string;
}

export interface PollData {
  title: string;
  content?: string;
  question: string;
  options: PollOption[];
  endDate: string;
  files?: File[];
}

export interface ComplaintData extends BasePostData {}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

// Types for the API
export type PostType = 'announcement' | 'campaign' | 'poll' | 'complaint';

export interface CreatePostPayload {
  community_id: string;
  user_id: string;
  type_post: PostType;
  title: string;
  content?: string;
  poll_options?: string[];
  end_date?: string;
  files?: File[];
  tags?: string[];
}
