const { Schema, model, default: mongoose } = require('mongoose');


const thoughtSchema = new Schema(
    {
        thoughtTest: {
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String
        }
    }
)