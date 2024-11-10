import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({ schemaOptions: { _id: false } })
export class CommentClass {
    @prop({ required: true, unique: true })
    comment_id: Types.ObjectId;

    @prop({ required: true })
    user_id: string;

    @prop({ default: 'Wow... So empty!' })
    content: string;

    @prop({ required: true })
    created_at: Date;
}

/**
 * - post_id (унікальний ідентифікатор),
 * - user_id (автор посту),
 * - content (текст посту),
 * - likes (масив user_id користувачів, які вподобали пост),
 * - comments (масив вбудованих документів з полями comment_id,
 * user_id, content і created_at).
 */
export class PostClass {
    @prop({ required: true, unique: true, index: true })
    post_id: Types.ObjectId;

    @prop({ required: true, index: true })
    user_id: Types.ObjectId;

    @prop({ default: 'Wow... So empty!' })
    content: string;

    @prop({ required: true, type: () => [String] })
    likes: string[];

    @prop({ required: true, type: () => [CommentClass] })
    comments: CommentClass[];
}

const PostModel = getModelForClass(PostClass, {
    schemaOptions: {
        collection: 'posts',
    },
});

export default PostModel;
