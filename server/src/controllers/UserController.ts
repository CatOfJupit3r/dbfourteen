import { createRouteInController } from '@controllers/RouteInController';
import { AuthBodyZodSchema, UserIdZodSchema } from '@models/ZodSchemas';
import DatabaseService from '@services/DatabaseService';
import { z } from 'zod';

class UserController {
    followUser = createRouteInController(
        async (req, res, _) => {
            const { user_id: userToFollow } = req.params;
            const { auth_token } = req.body;
            await DatabaseService.addFollowerToUser(auth_token, userToFollow);
            res.status(200).send({ message: 'User followed successfully' });
        },
        {
            body: AuthBodyZodSchema,
            params: UserIdZodSchema,
        }
    );

    getFreshPostsFromFollowedUsers = createRouteInController(
        async (req, res, _) => {
            const { limit: limitQuery } = req.query;
            const limit = limitQuery && !isNaN(parseInt(limitQuery as string)) ? parseInt(limitQuery as string) : 10;
            const { user_id: userId } = req.params;
            const posts = await DatabaseService.getFreshPostsFromFollowing(userId, limit);
            res.status(200).json({ posts });
        },
        {
            query: z.object({
                limit: z
                    .string()
                    .refine((limit) => !isNaN(parseInt(limit)), 'Limit must be a number')
                    .optional(),
            }),
            params: UserIdZodSchema,
        }
    );

    getAllUsersWithSubscriberCount = createRouteInController(async (req, res, _) => {
        const users = await DatabaseService.getAllUsersWithSubscriberCount();
        res.status(200).json({ users });
    });
}

export default new UserController();
