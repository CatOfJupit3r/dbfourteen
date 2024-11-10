import { MONGO_PASS, MONGO_URI, MONGO_USER } from '@configs';
import { BadRequest, InternalServerError } from '@models/ErrorModels';
import PostModel, { PostClass } from '@models/PostModel';
import UserModel, { UserClass } from '@models/UserModel';
import { DocumentType } from '@typegoose/typegoose';
import mongoose from 'mongoose';

type SupportedDocumentTypes = DocumentType<PostClass> | DocumentType<UserClass>;

class DatabaseService {
    public setup = async (): Promise<void> => {
        await mongoose.connect(MONGO_URI, {
            user: MONGO_USER,
            pass: MONGO_PASS,
        });
        console.log('Database is connected');
        await this.fillWithMocksIfEmpty();
    };

    public addFollowerToUser = async (userId: string, userToFollowId: string) => {
        const user = await UserModel.findById(userToFollowId);
        if (!user) throw new BadRequest('User not found');
        const follower = await UserModel.findById(userId);
        if (!follower) throw new BadRequest('Follower not found');
        user.following.push(userId);
        await this.saveDocument(user);
    };

    public addNewCommentToPost = async (postId: string, content: string, authorId: string) => {
        const post = await PostModel.findById(postId);
        if (!post) throw new BadRequest('Post not found');
        const comment = {
            comment_id: new mongoose.Types.ObjectId(),
            user_id: authorId,
            content,
            created_at: new Date(),
        };
        post.comments.push(comment);
        await this.saveDocument(post);
    };

    public addUserToLikedPosts = async (userId: string, postId: string) => {
        const user = await UserModel.findById(userId);
        if (!user) throw new BadRequest('User not found');
        const post = await PostModel.findById(postId);
        if (!post) throw new BadRequest('Post not found');
        post.likes.push(userId);
        await this.saveDocument(post);
    };

    public getFreshPostsFromFollowing = async (userId: string, limit: number = 10) => {
        // Показати 10 найновіших постів від користувачів,
        // на яких підписаний певний користувач, відсортованих за created_at.
        const user = await UserModel.findById(userId);
        if (!user) throw new BadRequest('User not found');
        return PostModel.aggregate([
            {
                $match: {
                    user_id: {
                        $in: user.following,
                    },
                },
            },
            {
                $sort: {
                    likes: -1,
                },
            },
            {
                $limit: limit,
            },
        ]);
    };

    public getAllUsersWithSubscriberCount = async () => {
        // Для кожного користувача визначити кількість
        // підписників.
        return UserModel.aggregate([
            // створюємо документ, де following це не масив, а один елемент
            {
                $unwind: {
                    path: '$following',
                    preserveNullAndEmptyArrays: true,
                },
            },
            // групуємо по following
            {
                $group: {
                    _id: '$following',
                    followers: {
                        $sum: 1,
                    },
                },
            },
            // шукаємо користувачів з following в _id
            {
                $lookup: {
                    from: 'users',
                    let: {
                        followingId: {
                            // оскільки _id в такому випадку стає строкою, то перетворюємо його в ObjectId
                            $toObjectId: '$_id',
                        },
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$user_id', '$$followingId'],
                                },
                            },
                        },
                    ],
                    as: 'user',
                },
            },
            // розгортаємо масив user. оскільки _id унікальні, то завжди буде один елемент
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true,
                },
            },
            // вибираємо тільки потрібні поля (без _id)
            {
                $project: {
                    _id: 0,
                    user_id: '$_id',
                    name: '$user.name',
                    email: '$user.email',
                    bio: '$user.bio',
                    created_at: '$user.created_at',
                    following: '$user.following',
                    followers: '$followers',
                },
            },
            // оскільки до цього агрегація враховувала тільки користувачів, які мають підписників,
            // то тепер додаємо тих, у кого їх немає
            // для цього беремо ВСІХ користувачів і задаємо їм 0 підписників
            {
                $unionWith: {
                    coll: 'users',
                    pipeline: [
                        {
                            $project: {
                                user_id: '$user_id',
                                name: '$name',
                                email: '$email',
                                bio: '$bio',
                                created_at: '$created_at',
                                following: '$following',
                                followers: {
                                    $literal: 0,
                                },
                            },
                        },
                    ],
                },
            },
            // тоді, користувачі з підписниками мають дублікати, тому беремо тільки унікальних
            {
                $group: {
                    _id: '$user_id',
                    name: {
                        $first: '$name',
                    },
                    email: {
                        $first: '$email',
                    },
                    bio: {
                        $first: '$bio',
                    },
                    created_at: {
                        $first: '$created_at',
                    },
                    following: {
                        $first: '$following',
                    },
                    followers: {
                        $max: '$followers',
                    },
                },
            },
            // і сортуємо за кількістю підписників
            {
                $sort: {
                    followers: -1,
                },
            },
        ]);
    };

    public getMostLikedPosts = async (limit: number = 10) => {
        // Показати 10 найпопулярніших постів за кількістю лайків.
        return PostModel.aggregate([
            {
                $sort: {
                    likes: -1,
                },
            },
            {
                $limit: limit,
            },
        ]);
    };

    private saveDocument = async (document: SupportedDocumentTypes) => {
        try {
            await document.save({
                validateBeforeSave: true,
            });
        } catch (e) {
            console.log(`Validation failed for creation of ${document.baseModelName}`, e);
            throw new InternalServerError();
        }
    };

    /** TEST DATA */

    private fillWithMocksIfEmpty = async (): Promise<void> => {
        const documents = ['UserModel', 'PostModel'];
        await Promise.all(documents.map((document) => this.fillWithMocks(document)));
        return;
    };

    private fillWithMocks = async (document: string): Promise<void> => {
        switch (document) {
            case 'UserModel': {
                console.log('Checking if users are empty');
                if ((await UserModel.countDocuments()) > 0) return;
                console.log('Filling with users');
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const data = require('@mocks/users.json');
                for (const user of data) {
                    const userDocument = new UserModel({
                        ...user,
                    });
                    await this.saveDocument(userDocument);
                }
                console.log('Filled with users');
                break;
            }
            case 'PostModel': {
                console.log('Checking if posts are empty');
                if ((await PostModel.countDocuments()) > 0) return;
                console.log('Filling with posts');
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const data = require('@mocks/posts.json');
                for (const post of data) {
                    const postDocument = new PostModel({
                        ...post,
                    });
                    await this.saveDocument(postDocument);
                }
                console.log('Filled with posts');
                break;
            }
            default:
                break;
        }
    };
}

export default new DatabaseService();
