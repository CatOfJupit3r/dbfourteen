export interface iUser {
    user_id: string;
    name: string;
    email: string;
    bio: string;
    created_at: Date;
    following: Array<iUser['user_id']>;
    followers: number;
}
