export interface UpdatePost{
    post_id: string;
    title?: string;
    content?: string;
    image?: string;
    poll_options?: string;
    updated_at?: Date;
    status?: string;
}