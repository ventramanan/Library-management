const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Failed:", err));

// API Routes
app.use('/api/members', require('./routes/member'));
app.use('/api/books', require('./routes/book'));
app.use('/api/issuances', require('./routes/issuance'));

// API Key Security
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
    next();
});

// Default Route
app.get('/', (req, res) => res.send('📚 Library Management System API Running!'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
