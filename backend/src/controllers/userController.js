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

        if(req.user.id !== user.id && req.user.role !== "admin"){
            return res.status(403).json({message: "Unauthorized to update profile"})
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({message: "Profile updated successfully."})
    } catch (error) {
        res.status(500).json({message: "Error updating user profile."})
    }
}

export const getUserAsessments = async (req, res) => {
    try {
        const assessments = await Assessment.find({userId: req.params.id});
        res.status(200).json(assessments);
    } catch (error) {
        res.status(500).json({message: "Error fetching assessments."})
    }
}

export const getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({userId: req.params.id});
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({message: "Error fetching submissions."})
    }
}

export const updateUserRole = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Unauthorized to change role."})
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User not found."})
        }

        user.role = role || user.role;
        await user.save();
        res.status(200).json({message: "User role updated successfully."})
    } catch (error) {
        res.status(500).json({message: "Error updating user role."})
    }
}