const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const courierRoutes = require('./routes/courierRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/users', userRoutes);
app.use('/api/couriers', courierRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
