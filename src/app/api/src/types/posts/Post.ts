export interface Post {
    id: string;
    title: string;
    content: {
        title: string;
        text: string;
        image?: string;
    };
    image: string; // Pode ser removido se não for mais necessário
    poll_options: string[];
    created_at: string;
    updated_at: string;
    user_id: string;
    author: {
        name: string;
        avatar: string;
        role?: string;
        institution?: string;
    };
    metadata: {
        type: string;
        time: string;
    };
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
}