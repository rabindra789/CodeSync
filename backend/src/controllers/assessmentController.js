const mongoose = require("mongoose");
const Assessment = require("../models/Assessment.js");
const User = require("../models/User");

exports.getAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.json(assessments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assessments." });
    }
};

exports.createAssessment = async (req, res) => {
    try {
        if (req.user.role !== "interviewer" && req.user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Unauthorized to create assessments." });
        }

        const { title, description, difficulty, testCases } = req.body;
        const createdBy = req.user.id;
        const assessment = new Assessment({
            title,
            description,
            difficulty,
            testCases,
            createdBy,
        });
        await assessment.save();
        res.status(201).json({
            message: "Assessment created successfully.",
            assessment,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating assessment." });
    }
};


exports.getAssessment = async (req, res) => {
    try {
        console.log("Fetching assessments for user:", req.params.assessmentId);

        const userId = new mongoose.Types.ObjectId(req.params.assessmentId); // Convert to ObjectId

        const assessments = await Assessment.find({
            $or: [{ createdBy: userId }, { assignedTo: userId }]
        });

        console.log("Assessments found:", assessments);
        res.status(200).json(assessments);
    } catch (error) {
        console.error("Error fetching assessments:", error);
        res.status(500).json({ message: "Error fetching assessments.", error: error.message });
    }
};


exports.updateAssessment = async (req, res) => {
    try {
        const { title, description, difficulty, testCases } = req.body;
        const assessment = await Assessment.findById(req.params.assessmentId);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found." });
        }

        if (
            req.user.role !== "admin" &&
            req.user.assessmentId !== assessment.createdBy.toString()
        ) {
            return res
                .status(403)
                .json({ message: "Unauthorized to update this assessment." });
        }

        assessment.title = title || assessment.title;
        assessment.description = description || assessment.description;
        assessment.difficulty = difficulty || assessment.difficulty;
        assessment.testCases = testCases || assessment.testCases;
        await assessment.save();
        res.json({ message: "Assessment updated successfully.", assessment });
    } catch (error) {
        res.status(500).json({ message: "Error updating assessment." });
    }
};

exports.deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.assessmentId);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found." });
        }

        await assessment.deleteOne();
        res.json({ message: "Assessment deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting assessment." });
    }
};

exports.assignAssessment = async (req, res) => {
    try {
        const { candidateId } = req.body;
        const candidate = await User.findById(candidateId);

        if (!candidate || candidate.role !== "candidate") {
            return res.status(400).json({ message: "Invalid candidate" });
        }

        const assessment = await Assessment.findById(req.params.assessmentId);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found." });
        }

        if (!assessment.assignedTo.includes(candidateId)) {
            assessment.assignedTo.push(candidateId);
            await assessment.save();
        }

        candidate.assignedAssessments.push(assessment._id);
        await candidate.save();

        res.json({ message: "Assessment assigned successfully.", assessment });
    } catch (error) {
        res.status(500).json({ message: "Error assigning assessment." });
    }
};

exports.getAssessmentCandidates = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.assessmentId).populate(
            "assignedTo",
            "name email"
        );
        if (!assessment)
            return res.status(404).json({ message: "Assessment not found" });

        res.json(assessment.assignedTo);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assigned candidates" });
    }
};

exports.addTestCase = async (req, res) => {
    try {
        const { input, expectedOutput } = req.body;

        const assessment = await Assessment.findById(req.params.assessmentId);
        if (!assessment)
            return res.status(404).json({ message: "Assessment not found" });

        assessment.testCases.push({ input, expectedOutput });
        await assessment.save();

        res.json({ message: "Test case added successfully", assessment });
    } catch (error) {
        res.status(500).json({ message: "Error adding test case" });
    }
};

exports.getTestCases = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.assessmentId);
        if (!assessment)
            return res.status(404).json({ message: "Assessment not found" });

        res.json(assessment.testCases);
    } catch (error) {
        res.status(500).json({ message: "Error fetching test cases" });
    }
};

exports.deleteTestCase = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.assessmentId);
        if (!assessment)
            return res.status(404).json({ message: "Assessment not found" });

        assessment.testCases = assessment.testCases.filter(
            (tc) => tc._id.toString() !== req.params.testCaseId
        );
        await assessment.save();

        res.json({ message: "Test case deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting test case" });
    }
};
