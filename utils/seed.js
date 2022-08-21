const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getUsernameAtIndex, getRandomThought, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);
connection.once("open", async () => {
    console.log("Connected");

    // Drop existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];
    const thoughts = [];


    for (let i = 0; i < 5; i++) {
        const username = getUsernameAtIndex(i);
        const userThoughts = getRandomThoughts(username, 2);

        thoughts.push(...userThoughts);
        const userThoughtsIds = userThoughts.map(thought => thought._id) 

        const friends = [];
        const friendCount = friends.length;

		const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`;

		users.push({
            thoughts: userThoughtsIds,
            friends,
			username,
			email,
            friendCount,
		});
    }

    await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(users);

	console.table(users);
    console.table(thoughts);
	console.info("Seeding complete! 🌱");
	process.exit(0);
})

