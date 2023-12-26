const mongoose = require('mongoose');

const reactionsSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => {
                return new Date(createdAtVal).toLocaleString();
            },
        },
    },
    {
        toJSON: {
            getters: true
        },
    }
);

module.exports = reactionsSchema; 