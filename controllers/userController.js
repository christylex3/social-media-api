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
        console.log(req.params.userId);
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate("thoughts")
            .populate("friends")
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user with that ID!" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user and their thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID!" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and their thoughts are deleted!" }))
			.catch((err) => res.status(500).json(err));
    },
    // Add a new friend to a user's friend list
    addFriend(req, res) {
        console.log(req.params.userId);
        console.log(req.params.friendId);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID!" } )
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    // Remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
			{ _id: req.params.userId },
			{
				$pull: {
					friends: req.params.friendId,
				},
			},
			{ runValidators: true, new: true }
		)
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};