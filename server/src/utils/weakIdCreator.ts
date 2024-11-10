import crypto from 'crypto';

export const weakIdCreator = (length: number = 8): string => {
    const randomBytes = crypto.randomBytes(length);
    return crypto.createHash('sha256').update(randomBytes).digest('hex');
};
