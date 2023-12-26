const { Schema, model, default: mongoose } = require('mongoose');
const thoughtSchema = reguire('./Thought');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 
            'Please enter a valid email address']
        },
        thoughts: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User