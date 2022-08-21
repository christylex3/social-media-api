const usernames = [
    "Pikachu",
    "Squirtle",
    "Charmander",
    "Bulbasaur",
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
const getRandomUsername = () => getRandomArrItem(usernames);

// Getting random thoughts
const getRandomThought = () => getRandomArrItem(thoughtsText);

module.exports = { getRandomUsername, getRandomThought }