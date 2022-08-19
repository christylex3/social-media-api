const { Schema, Types } = require("mongoose");

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
    }
);

userSchema
    .virtual("friendCount")
    .get(function() {
        return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;