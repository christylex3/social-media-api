const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [isEmail, "Invalid email"],
        },
        thoughts: {
            _id: [thoughtSchema], 
        },
        friends: {
            _id: [userSchema],
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual called friendCount that retrieves the length of the user's friends
userSchema
    .virtual("friendCount")
    .get(function() {
        return this.friends.length;
});

// Initialized the User model
const User = model("user", userSchema);

module.exports = User;