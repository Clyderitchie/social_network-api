const { User, Thought } = require('../models');

module.exports = {
    // Get all Users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Get user by ID
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .populate('thoughts').populate('friends')
                .select('-__v')
            if (!user) {
                return res.json({ message: 'Could not locate a user by that ID.' });
            }

            res.json(user)
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Update a user by ID
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true, runValidators: true }
            )

            if (!updatedUser) {
                return res.json({ message: 'Could not locate a user by that ID.' })
            }

            res.json(updatedUser)
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Delete a user by their ID
    async deleteUser(req, res) {
        try {
            const destroyUser = await User.findByIdAndDelete({ _id: req.params.id });
            const destroyUserThought = await Thought.deleteMany({ _id: { $in: destroyUser.thoughts } });

            if (!destroyUser || !destroyUserThought) {
                return res.json({ message: 'Could not locate a user by that ID, nor their thoughts.' })
            }

            res.json({ message: 'User was deleted and thoughts are gone, goodbye now.' })
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Add a friend for the user
    async addFriend(req, res) {
        try {
            const addFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            )

            if (!addFriend) {
                return res.json({ message: 'No user was found with this ID.' })
            }

            res.json(addFriend)
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    },
    // Delete a friend
    async removeFriend(req, res) {
        try {
            const deleteFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )

            if (!deleteFriend) {
                return res.json({ message: 'Can not find a friend by this ID, no one was removed from friends list.'} )
            }

            res.json(deleteFriend)
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    }
}