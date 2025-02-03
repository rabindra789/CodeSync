const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assessmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assessment",
            required: true,
        },
        sourceCode: {
            type: String,
            required: true,
        },
        languageId: {
            type: Number,
            required: true,
        },
        results: [
            {
                testCaseId: String,
                token: String,
            },
        ],
    },
    { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
