import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './src/routes/userRoutes';
import courierRoutes from './src/routes/courierRoutes';
import serviceRoutes from './src/routes/serviceRoutes'; 

require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/users', userRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/services', serviceRoutes); 

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
