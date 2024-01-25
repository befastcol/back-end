import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../interfaces/user';

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
    role: {
        type: String,
        enum: ['user', 'courier', 'admin'],
        default: 'user'
    },
    INE: {
        front: { type: String, default: null },
        back: { type: String, default: null }
    },
    driverLicense: {
        front: { type: String, default: null },
        back: { type: String, default: null }
    }
});

export const User = mongoose.model<UserInterface>('User', userSchema);
