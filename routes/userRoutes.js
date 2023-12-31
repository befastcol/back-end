const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.post('/register', async (req, res) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ message: "Name and phone are required" });
        }

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new User({ name, phone });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
