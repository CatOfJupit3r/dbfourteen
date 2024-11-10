import { createRouteInController } from '@controllers/RouteInController';
import { PostIdZodSchema, UserIdZodSchema } from '@models/ZodSchemas';
import DatabaseService from '@services/DatabaseService';
import { z } from 'zod';

class PostController {
    getMostLikedPosts = createRouteInController(
        async (req, res, _) => {
            const { limit: limitQuery } = req.query;
            const limit = limitQuery && !isNaN(parseInt(limitQuery as string)) ? parseInt(limitQuery as string) : 10;
            const posts = await DatabaseService.getMostLikedPosts(limit);
            res.status(200).json({ posts });
        },
        {
            query: z.object({
                limit: z
                    .string()
                    .refine((limit) => !isNaN(parseInt(limit)), 'Limit must be a number')
                    .optional(),
            }),
        }
    );

    addNewCommentToPost = createRouteInController(
        async (req, res, _) => {
            const { post_id: postId } = req.params;
            const { user_id: userId, content } = req.body;
            await DatabaseService.addNewCommentToPost(postId, content, userId);
            res.status(200).send({ message: 'Comment added successfully' });
        },
        {
            body: z
                .object({
                    // comment_id: z.string(), created automatically
                    content: z.string().min(1).max(32768),
                    // created_at: z.date(), assigned automatically
                })
                .merge(UserIdZodSchema),
            params: PostIdZodSchema,
        }
    );

    likePost = createRouteInController(
        async (req, res, _) => {
            const { post_id: postId } = req.params;
            const { user_id: userId } = req.body;
            await DatabaseService.addUserToLikedPosts(userId, postId);
            res.status(200).send({ message: 'Post liked successfully' });
        },
        {
            body: UserIdZodSchema,
            params: PostIdZodSchema,
        }
    );
}

export default new PostController();
