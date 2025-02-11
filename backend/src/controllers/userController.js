const User = require("../models/User");
const Assessment = require("../models/Assessment");
const Submission = require("../models/Submission");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if(!user) return res.status(404).json({message: "User not found."});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error fetching user profile."})
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const {name, email, role} = req.body;
        const user = await User.findById(req.params.userId);

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

exports.getUserAssessments = async (req, res) => {
    try {
        // console.log("Fetching assessments for user:", req.params.id);

        // Find assessments where the user is either the creator or assigned
        const assessments = await Assessment.find({
            $or: [
                { createdBy: req.params.userId },
                { assignedTo: req.params.userId }
            ]
        });

        console.log("Assessments found:", assessments);
        res.status(200).json(assessments);
    } catch (error) {
        console.error("Error fetching assessments:", error);
        res.status(500).json({ message: "Error fetching assessments.", error: error.message });
    }
};


exports.getUserSubmissions = async (req, res) => {  
    try {

        // console.log("Fetching submissions for user:", req.params.id);
        // Find assessments where the user is either the creator or assigned
        const submissions = await Submission.find({userId: req.params.userId});

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching submissions." });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized to change role." });
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const { role } = req.body;  // Added this line to fix undefined 'role'
        user.role = role || user.role;
        await user.save();
        res.status(200).json({ message: "User role updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role." });
    }
};
