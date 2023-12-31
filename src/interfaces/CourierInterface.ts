import { Document, Types } from 'mongoose';

export interface CourierInterface extends Document {
    userId: Types.ObjectId;
    INE_front: string;
    INE_back: string;
    driverLicense: string;
}
