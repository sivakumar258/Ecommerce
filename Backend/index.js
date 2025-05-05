const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Middleware setup
app.use(express.json()); // Parses JSON bodies
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://msivakumar258:siva@cluster0.ynmzjii.mongodb.net/Shopping?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Mongoose User model
const User = mongoose.model('User', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });

        if (check) {
            return res.status(400).json({ success: false, error: "Existing user found" });
        }

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });

    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// ✅ Login route (FIXED)
app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }); // ✅ Fixed model reference

        if (user) {
            const passCompare = req.body.password === user.password; // ✅ Fixed typo

            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, error: "Wrong Password" });
            }
        } else {
            res.json({ success: false, error: "Wrong Email Id" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Start server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
