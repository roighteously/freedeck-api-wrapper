const { io } = require("socket.io-client");
const socket = io("ws://localhost:5754");

const config = require('../config.json');
const { log } = require('./globalUtil');
const auth = require('./auth');
const companion = require('./companion');

socket.on('connect', (dat) => {
	log("Connected to Freedeck");
})
socket.on("session_valid", () => { 
	log("Session valid!")
});
socket.on("session_invalid", () => { 
	log("Session invalid: kicked out")
});

// Init companion client
companion();

// Init auth stuff
auth(config.loginID, config.passwd, socket);