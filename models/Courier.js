const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        unique: true
    },
    INE_front: String, 
    INE_back: String,  
    driverLicense: String 
});

const Courier = mongoose.model('Courier', courierSchema);

module.exports = Courier;