
import mongoose, { Schema } from 'mongoose';
import { CourierInterface } from '../interfaces/CourierInterface';

const courierSchema = new Schema<CourierInterface>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        unique: true
    },
    INE_front: String, 
    INE_back: String,  
    driverLicense: String 
});

const Courier = mongoose.model<CourierInterface>('Courier', courierSchema);

export default Courier;
