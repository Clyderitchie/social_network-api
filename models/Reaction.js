const { Schema, model, default: mongoose } = require('mongoose');

const reactionsSchema = new Schema(
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

const Reaction = model('reaction', reactionsSchema);

module.exports = Reaction; 