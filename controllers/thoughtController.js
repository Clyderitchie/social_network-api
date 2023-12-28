const { Thought, User } = require('../models');

module.exports = {
    //  Get all Thoughts
    async getAllThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Get Thoughts by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
                .populate({
                    path: 'reactions',
                    select: '-__v',
                })
                .select('-__v')

            if (!thought) {
                return res.status(404).json({ message: 'No thought was found by that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Create a Thought
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    //  Update a Thought
    async updateThought(req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updateThought) {
                return res.status(404).json({ message: 'Could not find a Thought with that Id to update ' });
            }

            res.json(updateThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    //  Delete a Thought
    async deleteThought(req, res) {
        try {
            const destroyThought = await Thought.findByIdAndDelete({ _id: req.params.id });
            const userThoughtDestroy = await User.findByIdAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } },
                { new: true },
            )
            if (!destroyThought || !userThoughtDestroy) {
                return res.status(404).json({ message: 'Could not find a Thought by that ID to delete.' });
            }

            res.json({ message: 'Thought has been deleted. Brain empty no more thoughts...' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    //  Add a Reaction
    async addReaction(req, res) {
        try {
            const addReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true },
            )

            if (!addReaction) {
                return res.json({ message: 'No thought with this ID was found.' });
            }

            res.json(addReaction)
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Remove a Reaction
    async removeReaction(req, res) {
        try {
            const reactionRemove = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            )

            if (!reactionRemove) {
                return res.json({ message: 'Could not locate a Reaction by that ID. Sad face.' })
            }

            res.json(reactionRemove)
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    }
}