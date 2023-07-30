const { io } = require("socket.io-client");
const socket = io("ws://localhost:5754");

const config = require('../config.json');
const { log } = require('./globalUtil');
const auth = require('./auth');
const companionInit = require('./companion');

socket.on('connect', () => {
	log("Connected to Freedeck");
})
socket.on("session_valid", () => { 
	log("Session valid!")
});
socket.on("session_invalid", () => { 
	log("Session invalid: kicked out")
});

// Init companion client
const companion = companionInit();
companion.log("Sender", "Data");

// Init auth stuff
auth(config.loginID, config.passwd, socket);