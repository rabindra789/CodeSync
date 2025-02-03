const mongoose = require("mongoose");

const CollaborationSessionSchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true }
);

const CollaborationSession = mongoose.model(
    "CollaborationSession",
    CollaborationSessionSchema
);
export default CollaborationSession;
