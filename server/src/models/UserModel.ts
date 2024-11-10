import { EMAIL_REGEX } from '@configs';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

/**
 * - user_id (унікальний ідентифікатор),
 * - name (ім'я),
 * - email (має бути унікальним),
 * - bio (короткий опис користувача),
 * - created_at (дата створення акаунта),
 * - following (масив user_id користувачів, на яких підписаний даний
 * користувач).
 */
export class UserClass {
    @prop({ required: true, unique: true })
    user_id: Types.ObjectId;

    @prop({ required: true })
    name: string;

    @prop({ required: true, unique: true, validate: EMAIL_REGEX })
    email: string;

    @prop({ default: 'Wow... So empty!' })
    bio: string;

    @prop({ required: true })
    created_at: Date;

    @prop({ required: true, type: () => [String] })
    following: string[];
}

const UserModel = getModelForClass(UserClass, {
    schemaOptions: {
        collection: 'users',
    },
});

export default UserModel;
