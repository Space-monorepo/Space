export interface CreateComment{
    post_id: string;
    user_id: string;
    user_name: string;
    user_profile_picture?: string;
    comment_text: string;
    parent_comment_id?: string;
    created_at?: Date;
}