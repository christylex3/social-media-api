const { User, Thought } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user by id
    // TODO: need to populate thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user with that ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
}