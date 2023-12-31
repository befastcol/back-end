import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface';

const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

export const User = mongoose.model<UserInterface>('User', userSchema);
