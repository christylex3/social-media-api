const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: getter method to format timestamp on query
            // COME BACK LATER
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual called reactionCount that retrieves the length of the thought's reactions array
thoughtSchema
    .virtual("reactionCount")
    .get(function() {
        return this.reactions.length;
});

// Initializes the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;