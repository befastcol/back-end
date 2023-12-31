import { Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    phone: string;
    isAdmin: boolean;
}
