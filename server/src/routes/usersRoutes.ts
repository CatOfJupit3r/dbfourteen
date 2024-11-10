import { createConfig, createRouter } from '@controllers/RouteInController';
import UserController from '@controllers/UserController';

export default createRouter([
    createConfig('get', '/', UserController.getAllUsersWithSubscriberCount),
    createConfig('get', '/:user_id/feed', UserController.getFreshPostsFromFollowedUsers),
    createConfig('post', '/:user_id/follow', UserController.followUser),
]);
