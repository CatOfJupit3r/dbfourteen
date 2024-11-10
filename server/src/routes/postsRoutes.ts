import PostController from '@controllers/PostController';
import { createConfig, createRouter } from '@controllers/RouteInController';

export default createRouter([
    createConfig('get', '/', PostController.getMostLikedPosts),
    createConfig('post', '/:post_id/comments', PostController.addNewCommentToPost),
    createConfig('post', '/:post_id/likes', PostController.likePost),
]);
