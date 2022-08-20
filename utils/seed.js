const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);
connection.once("open", async () => {
    console.log("Connected");

    // Drop existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Creates empty array to hold the users
    const users = [];
})

