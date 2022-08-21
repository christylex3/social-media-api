const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getUsernameAtIndex, getRandomThought } = require("./data");

connection.on("error", (err) => err);
connection.once("open", async () => {
    console.log("Connected");

    // Drop existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];



    for (let i = 0; i < 5; i++) {
        const username = getUsernameAtIndex(i);

        // TODO: Grab ID instead
        // const thought = getRandomThought();
        const thoughts = [];
        const friends = [];

		const email = `${username}${Math.floor(
			Math.random() * (99 - 18 + 1) + 18
		)}@gmail.com`;

		users.push({
            thoughts,
            friends,
			username,
			email,
		});
    }

    // await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(users);

	console.table(users);
	console.info("Seeding complete! 🌱");
	process.exit(0);
})

