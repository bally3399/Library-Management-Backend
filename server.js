const express = require('express');
const pool = require('./db'); // PostgreSQL connection
const redis = require('redis'); // Redis client
const AWS = require('aws-sdk'); // AWS S3
const cloudinary = require('cloudinary').v2; // Cloudinary
const jwt = require('jsonwebtoken'); // JWT
require('dotenv').config(); // Load .env variables

const app = express();
app.use(express.json()); // Parse JSON requests

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Redis
const redisClient = redis.createClient({
    url: process.env.REDIS_CONNECTION,
});
redisClient.on('error', (err) => console.log('Redis Client Error:', err));

// PostgreSQL Connection Test Route
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'PostgreSQL connected', time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Placeholder Route for Users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    // try {
    //     await redisClient.connect();
    //     console.log('Redis connected');
    // } catch (err) {
    //     console.error('Redis connection error:', err);
    // }
});