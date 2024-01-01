import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './src/routes/userRoutes';
import courierRoutes from './src/routes/courierRoutes';
import serviceRoutes from './src/routes/serviceRoutes';

dotenv.config();

const app = express();
app.use(express.json());

const mongoUri: string = process.env.MONGO_URI || 'mongodb://localhost/myapp'; 

mongoose.connect(mongoUri)

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/services', serviceRoutes);

const port: number = parseInt(process.env.PORT || '3000', 10);

app.listen(port, () => console.log(`Server running on port ${port}`));
