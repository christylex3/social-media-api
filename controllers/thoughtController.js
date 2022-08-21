// Might need to import something else too?
const { Thought, User } = require("../models");

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        // Might need to fix
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID" })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            // need to push created thoughts _id to associated user's thoughts
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id} },
                    { new: true }
                );
            })
            .then((user) =>
            !user
                ? res.status(404).json({
                    message: "Thought is created but cannot find the user with that ID!",
                })
                :res.json("Successfully created the thought!")
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Updates thought by its id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought with this id!"})
                : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Deletes thought by its id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this id! "})
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId }},
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Thought is created, but there is no user with this id!" })
                    : res.json({ message: "Thought is successfully deleted!" })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add reactions to thoughts by storing the reaction in the thought's reactions array
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this id!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Pulls and remove a reaction by its id value
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};