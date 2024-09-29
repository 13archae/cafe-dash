import mongoose from 'mongoose';

export const connection = mongoose.connect(env.development.MONGODB_URI)

