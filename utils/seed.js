const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getUsername } = require("./data");


connection.on("error", (err) => err);
connection.once("open", async () => {
    console.log("Connected");

    // Drop existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < 3; i++) {
        const username = usernames[i];
    }

    users.push({
        username
    })

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
})

