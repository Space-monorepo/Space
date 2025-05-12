export interface Signup{
    email: string;
    name: string;
    hashed_password: string;
    profile_image_url?: string;
    reputation_level?: string;
    status?: string;
}