import { iPost } from '@models/Post';
import { iUser } from '@models/User';
import axios from 'axios';
import { toast } from 'react-toastify';
import { VITE_APP_BACKEND_URL } from '../configs';

class APIService {
    private routes = {
        getMostLikedPosts: `${VITE_APP_BACKEND_URL}/posts?limit=10`,
        likePost: (post_id: string) => `${VITE_APP_BACKEND_URL}/posts/:post_id/likes`.replace(':post_id', post_id),
        addCommentToPost: (post_id: string) =>
            `${VITE_APP_BACKEND_URL}/posts/:post_id/comments`.replace(':post_id', post_id),
        users: `${VITE_APP_BACKEND_URL}/users`,
        getUserFeed: (user_id: string) =>
            `${VITE_APP_BACKEND_URL}/users/:user_id/feed?limit=10`.replace(':user_id', user_id),
        followThisUser: (user_id: string) =>
            `${VITE_APP_BACKEND_URL}/users/:user_id/follow`.replace(':user_id', user_id),
    };

    public async getMostLikedPosts(): Promise<Array<iPost>> {
        const response = await axios.get(this.routes.getMostLikedPosts);
        const { posts } = response.data;
        if (posts instanceof Array) {
            return posts.map((post: unknown) => this.processPost(post));
        }
        return [];
    }

    public async getUsers(): Promise<Array<iUser>> {
        const response = await axios.get(this.routes.users);
        const { users } = response.data;
        if (users instanceof Array) {
            return users.map((user: unknown) => this.processUser(user));
        }
        return [];
    }

    public async getUserFeed(user_id: string): Promise<Array<iPost>> {
        const response = await axios.get(this.routes.getUserFeed(user_id));
        const { posts } = response.data;
        if (posts instanceof Array) {
            return posts.map((post: unknown) => this.processPost(post));
        }
        return [];
    }

    public async followUser(userToFollow: string, user_id: string): Promise<void> {
        const resp = await axios.post(this.routes.followThisUser(userToFollow), { auth_token: user_id });
        if (resp.status !== 200) {
            toast('Failed to follow user', { type: 'error' });
        } else {
            const { message } = resp.data;
            toast(message, { type: 'success' });
        }
    }

    public async likePost(post_id: string, user_id: string): Promise<void> {
        const resp = await axios.post(this.routes.likePost(post_id), { user_id });
        if (resp.status !== 200) {
            toast('Failed to like post', { type: 'error' });
        } else {
            const { message } = resp.data;
            toast(message, { type: 'success' });
        }
    }

    public async addCommentToPost(post_id: string, user_id: string, content: string): Promise<void> {
        const resp = await axios.post(this.routes.addCommentToPost(post_id), { content, user_id });
        if (resp.status !== 200) {
            toast('Failed to add comment', { type: 'error' });
        } else {
            const { message } = resp.data;
            toast(message, { type: 'success' });
        }
    }

    private processPost(post: any): iPost {
        return {
            ...post,
            created_at: new Date(post.created_at),
            comments: post.comments.map((comment: any) => ({
                ...comment,
                created_at: new Date(comment.created_at),
            })),
        };
    }

    private processUser(user: any) {
        return {
            ...user,
            created_at: new Date(user.created_at),
        };
    }
}

export default new APIService();
