const mongoose = require("mongoose");

const CollaborationSessionSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            required: true,
            unique: true, // Ensure room IDs are unique
        },
        assessmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assessment",
            required: true,
        },
        participants: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                username: {
                    type: String,
                    required: true,
                },
                accesses: {
                    type: [String], // Store user access permissions
                    default: ["room:write"],
                },
            },
        ],
        code: {
            type: String,
            default: "",
        },
        cursorPositions: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                position: {
                    line: Number,
                    column: Number,
                },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        metadata: {
            type: Object, // Store any additional room metadata
            default: {},
        },
    },
    { timestamps: true }
);

const CollaborationSession = mongoose.model(
    "CollaborationSession",
    CollaborationSessionSchema
);
module.exports = CollaborationSession;
