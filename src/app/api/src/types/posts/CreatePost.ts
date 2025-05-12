export interface CreatePost{
    community_id: string;
    user_id: string;
    user_name: string;
    user_profile_picture?: string;
    type_post: string;
    title: string;
    content?: string;
    image?: string;
    poll_options?: string;
    total_likes?: number;
    comments_count?: number;
    status?: string;
    count_reports?: number;
}