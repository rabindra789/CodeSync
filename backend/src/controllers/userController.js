const User = require("../models/User");
const Assessment = require("../models/Assessment");
const Submission = require("../models/Submission");

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: "User not found."});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error fetching user profile."})
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const {name, email, role} = req.body;
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({message: "User not found."})
        }
    } catch (error) {
        res.status(500).json({message: "Error updating user profile."})
    }
}