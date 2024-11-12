import { iUser } from '@models/User';

export interface iComment {
    comment_id: string;
    user_id: iUser['user_id'];
    content: string;
    created_at: Date;
}

type CommentSection = Array<iComment>;

export interface iPost {
    post_id: string;
    user_id: iUser['user_id'];
    content: string;
    likes: string[];
    comments: CommentSection;
    created_at: Date;
}
