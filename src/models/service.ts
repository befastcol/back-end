import mongoose, { Schema } from 'mongoose';
import { ServiceInterface } from '../interfaces/ServiceInterface';

const serviceSchema = new Schema<ServiceInterface>({
    date: {
        type: Date,
        default: Date.now 
    },
    origin: {
        type: String,
        required: true,
        trim: true 
    },
    destination: {
        type: String,
        required: true,
        trim: true 
    },
    price: {
        type: Number,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courier: {
        type: Schema.Types.ObjectId,
        ref: 'Courier',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    courierLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

serviceSchema.index({ courierLocation: '2dsphere' });

export const Service = mongoose.model<ServiceInterface>('Service', serviceSchema);
