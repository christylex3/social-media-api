const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

var isEmail = function(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

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
            _id: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Thought",
                }
            ], 
        },
        friends: {
            _id: [this],
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual called friendCount that retrieves the length of the user's friends array
userSchema
    .virtual("friendCount")
    .get(function() {
        return this.friends.length;
});

// Initializes the User model
const User = model("user", userSchema);

module.exports = User;