import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const MONGO_USER = process.env.MONGO_USER || 'user';
export const MONGO_PASS = process.env.MONGO_PASS || '123123';
