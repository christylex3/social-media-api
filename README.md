# Social Media API

## Description

This application is the backend for the social network web application where users can share their thoughts, add friends, and react to each others' thoughts.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Video](#video)
* [Contribution](#contribution)
* [Questions](#questions)

## Installation

The application does require dependencies, so enter this code (below) into the terminal and run it.
```
npm i
```

(Optional) Download [Insomnia](https://insomnia.rest/download) for backend functionality testing. 

## Usage

To make API call, type the following into your url after your port number:

### User Requests
* `GET` /api/users - finds all users
* `GET` /api/users/:userId - finds a single user by their ID
* `POST` /api/users - creates a user (include username and email)
* `PUT` /api/users/:userId - updates a user's username or email
* `DELETE` /api/users/:userId - deletes a user and their associated thoughts by id

### Friend Requests
* `POST` /api/users/:userId/friends/:friendId - user adds that friend
* `DELETE` /api/users/:userId/friends/:friendId - user deletes that friend

### Thought Requests
* `GET` /api/thoughts - finds all thoughts
* `GET` /api/thoughts/:thoughtId - finds a single thought by their ID
* `POST` /api/thoughts - creates a new thought (include thoughtText, user's ID, and user's username)
* `PUT` /api/thoughts/:thoughtId - updates a new thought (thoughtText)
* `DELETE` /api/thoughts/:thoughtId - deletes a thought by ID

### Reaction Requests
* `POST` /api/thoughts/:thoughtId/reactions - creates a reaction on the thought
* `DELETE` /api/thoughts/:thoughtId/reactions/:reactionId - deletes a reaction on the thought

## Video
 [A video is provided](https://drive.google.com/file/d/1pUZ2kE4nHtt1-eAkXqWwZsXnl6QslU0Z/view) to demonstrate the functionality of the Social Media API.

## Contribution

No contributions needed.


## Questions

If you have any questions and want to reach me, email me at <christylex3@gmail.com>. Also, you can check out my other work [here](https://github.com/christylex3).