const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ username, email, password });
        res.status(201).json({
            _id: user._id,
            username,
            email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "user not found." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials." });

        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        res.status(500).json({ message: "Error in logged in." });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
};
