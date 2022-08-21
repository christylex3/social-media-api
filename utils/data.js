const mongoose = require("mongoose");

const usernames = [
    "Pikachu",
    "Squirtle",
    "Charmander",
    "Bulbasaur",
    "Togepi",
    "Eevee",
    "Piplup",
    "Magikarp",
    "Mudkip",
    "Snorlax",
    "Oddish",
    "Bonsly",
    "Slowpoke",
    "Jigglypuff",
    "Cleffa",
    "Cyndaquil",
    "Wooper",
    "Mew",
    "Mewtwo",
    "Lucario",
];

const thoughtsText = [
    "I miss playing Pokemon Go...",
    "Gotta catch them all!",
    "My pokemon finally evolved!",
    "Anyone want to trade pokemons?",
    "Let's do a raid!",
    "I can't wait for a new event.",
]

const reactionBody = [
    "Yeah, same!",
    "Wow.",
    "Can we go raid?",
    "Yo, let's trade pokemons.",
    "What are you talking about?"
]

// Getting random items from array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Getting random username
const getUsernameAtIndex = (int) => usernames[int];

// Getting friends
const getFriends = (users) => {
    const friends = users.filter(user => user.username == "Pikachu" || user.username == "Charmander");
    // console.log(friends[0]);
    console.log(friends);
	return friends.map(friend => friend._id);
}

// Getting random thoughts
const getRandomThoughts = (username, int) => {
    const results = [];
	for (let i = 0; i < int; i++) {
        const reactions = getRandomReactions(username);
		results.push({
            _id: mongoose.Types.ObjectId(),
            username: username,
            thoughtsText: getRandomArrItem(thoughtsText),
            createdAt: Date.now(),
            reactions: reactions,
            __v: 0,
            reactionCount: reactions.length,
        });
	}
	return results;
}

const getRandomReactions = (username) => {
    const reactions = [];
    const numOfReactions = Math.floor(Math.random() * 3)
    for (let i = 0; i < numOfReactions; i++) {
        reactions.push({
            createdAt: Date.now,
            reactionBody: getRandomArrItem(reactionBody),
            username: username,
        });
    }
    return reactions;
}

module.exports = { getUsernameAtIndex, getFriends, getRandomThoughts }