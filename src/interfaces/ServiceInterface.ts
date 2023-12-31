import { Document, Types } from 'mongoose';

export interface ServiceInterface extends Document {
    date: Date;
    origin: string;
    destination: string;
    price: number;
    customer: Types.ObjectId;
    courier: Types.ObjectId;
    status: 'pending' | 'in_progress' | 'completed';
    courierLocation: {
        type: string;
        coordinates: number[];
    };
}
