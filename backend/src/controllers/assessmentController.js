const Assessment = require("../models/Assessment");
const User = require("../models/User");

export const getAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.json(assessments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assessments." });
    }
};

export const createAssessment = async (req, res) => {
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

export const getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found." });
        }
        res.json(assessment);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assessment." });
    }
};

export const updateAssessment = async (req, res) => {
    try {
        const { title, description, difficulty, testCases } = req.body;
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found." });
        }

        if (
            req.user.role !== "admin" &&
            req.user.id !== assessment.createdBy.toString()
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

export const deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found." });
        }

        await assessment.deleteOne();
        res.json({ message: "Assessment deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting assessment." });
    }
};

export const assignAssessment = async (req, res) => {
    try {
        const { candidateId } = req.body;
        const candidate = await User.findById(candidateId);

        if (!candidate || candidate.role !== "candidate") {
            return res.status(400).json({ message: "Invalid candidate" });
        }

        const assessment = await Assessment.findById(req.params.id);
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

export const getAssignedCandidates = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id).populate(
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

export const addTestCase = async (req, res) => {
    try {
        const { input, expectedOutput } = req.body;

        const assessment = await Assessment.findById(req.params.id);
        if (!assessment)
            return res.status(404).json({ message: "Assessment not found" });

        assessment.testCases.push({ input, expectedOutput });
        await assessment.save();

        res.json({ message: "Test case added successfully", assessment });
    } catch (error) {
        res.status(500).json({ message: "Error adding test case" });
    }
};

export const getTestCases = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment)
            return res.status(404).json({ message: "Assessment not found" });

        res.json(assessment.testCases);
    } catch (error) {
        res.status(500).json({ message: "Error fetching test cases" });
    }
};

export const deleteTestCase = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
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
