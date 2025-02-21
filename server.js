const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Corrected Express JSON middleware

// Connect to Database
connectDB();

// Models
const User = require('./models/userModel');

// Register Route
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Registration failed" });
    }
});

// Login Route
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

// Protected Route (Example)
app.get('/api/protected', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, "your_jwt_secret", (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden" });
        res.json({ message: "Protected content", user });
    });
});

const productRoutes = require('./routes/productRoutes'); // Import product routes
const orderRoutes = require('./routes/orderRoutes');

// Use Routes
app.use('/api/products', productRoutes); // Enable product routes
app.use('/api/orders', orderRoutes);



// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
