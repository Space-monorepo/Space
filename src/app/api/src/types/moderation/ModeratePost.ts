export type PostStatus = "pending" | "approved" | "rejected" | "reported";

export interface ModeratePost {
    post_id: string;
    newStatus: PostStatus;
    community_id: string;
}