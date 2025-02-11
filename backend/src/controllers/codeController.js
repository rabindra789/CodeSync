const axios = require("axios");
const env = require("../config/env");

const JUDGE0_API_KEY = env.JUDGE0_API_KEY;
const JUDGE0_API_URL = env.JUDGE0_API_URL;

// Execute Code

exports.executeCode = async (req, res) => {
    try {
        const {sourceCode, languageId, stdin} = req.body;

        if(!sourceCode || !languageId ) {
            return res.status(400).json({message: "Source code and language ID are required"})
        }

        const response = await axios.post(
            `${JUDGE0_API_URL}/submissions`,
            {
                source_code: sourceCode,
                language_id: languageId,
                stdin: stdin || "",
            },
            {
                headers: {
                    "x-rapidapi-key": JUDGE0_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(201).json({token: response.data.token, message: "Code submitted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error submitting code", error: error.message})
    }
}

// Get Execution Status

exports.getExecutionStatus = async (req, res) => {
    try {
        const {executionId} = req.params;

        const response = await axios.get(`${JUDGE0_API_URL}/submissions/${executionId}`, {
            headers: {
                "x-rapidapi-key": JUDGE0_API_KEY,
            },
        });

        res.json({status: response.data.status});
    } catch (error) {
        res.status(500).json({message: "Error fetching execution status", error: error.message})
    }
}

// Get Execution Result

exports.getExecutionResult = async (req, res) => {
    try {
        const {executionId} = req.params;

        const response = await axios.get(`${JUDGE0_API_URL}/submissions/${executionId}`, {
            headers: {
                "x-rapidapi-key": JUDGE0_API_KEY,
            },
        });

        res.json({stdout: response.data.stdout, stderr: response.data.stderr, compile_output: response.data.compile_output, message: "Execution result retrieved"});
    } catch (error) {
        res.status(500).json({message: "Error fetching execution result", error: error.message})
    }
}