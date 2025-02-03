const axios = require("axios");
const env = require("../config/env");
const Submission = require("../models/Submission.js");
const Assessment = require("../models/Assessment.js");

const JUDGE0_API_KEY = env.JUDGE0_API_KEY;
const JUDGE0_API_URL = env.JUDGE0_API_URL;

// Submit Code
export const submitCode = async (req, res) => {
    try {
        const { assessmentId, sourceCode, languageId } = req.body;

        const assessment = await Assessment.findById(assessmentId);

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }


        let results = [];
        for (const testCase of assessment.testCases) {
            const response = await axios.post(
                `${JUDGE0_API_URL}/submissions`,
                {
                    source_code: sourceCode,
                    language_id: languageId,
                    stdin: testCase.input,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-key": JUDGE0_API_KEY,
                    },
                }
            );

            results.push({
                testCaseId: testCase._id,
                token: response.data.token,
            });
        }

        const submission = new Submission({
            userId: req.user._id,
            assessmentId,
            sourceCode,
            languageId,
            results,
        });

        await submission.save();

        res.status(201).json({
            message: "Code submitted successfully",
            submission
        });
    } catch (error) {
        res.status(500).json({
            message: "Error submitting code",
            error: error.message,
        });
    }
};

// Get Submission by ID
export const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({message: "Submission not found"});
        }
        res.json(submission)
    } catch (error) {
        res.status(500).json({message: "Error fetching submission", error: error.message});
    }
}

// Get Submission Result
export const getSubmissionResult = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({message: "Submission not found"});
        }

        let results = [];
        for (const result of submission.results) {
            const response = await axios.get(`${JUDGE0_API_URL}/submissions/${result.token}`, {
                headers: {
                    "X-RapidAPI-Key": JUDGE0_API_KEY,
                },
            });

            results.push({
                testCaseId:result.testCaseId,
                stdout: response.data.stdout,
                stderr: response.data.stderr,
                compile_output: response.data.compile_output,
            });
        }

        res.json({results})
    } catch (error) {
        res.status(500).json({message: "Error fetching submission result", error: error.message});
    }
}


// Get All Submissions for User
export const getAllSubmissionForUser = async (req, res) => {
    try {
        const submissions = await Submission.find({userId: req.params.userId});
        res.json(submissions);
    } catch (error) {
        res.status(500).json({message: "Error fetching submissions"})
    }
}