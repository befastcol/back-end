const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courier',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
