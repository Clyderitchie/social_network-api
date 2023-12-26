const { User, Thought, Reaction } = require('../models');

// User routes/Controllers
module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err.message);
            console.log(err);
        }
    }
}