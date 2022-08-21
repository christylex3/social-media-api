var mongoose = require("mongoose");

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

// Getting random items from array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Getting random username
const getUsernameAtIndex = (int) => usernames[int];

// Getting random friends
const getRandomFriends = (int) => {
    const results = [];
	for (let i = 0; i < int; i++) {
		results.push(get);
	}
	return results;
}

// Getting random thoughts
const getRandomThoughts = (username, int) => {
    const results = [];
	for (let i = 0; i < int; i++) {
		results.push({
            _id: mongoose.Types.ObjectId(),
            username: username,
            thoughtsText: getRandomArrItem(thoughtsText),
            createdAt: Date.now,
            reactions: [],
            __v: 0,
            reactionCount: 0,
        });
	}
	return results;
    
}

module.exports = { getUsernameAtIndex, getRandomThoughts }