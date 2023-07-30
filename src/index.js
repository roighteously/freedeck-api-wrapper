const { io } = require("socket.io-client");
const socket = io("ws://localhost:5754");

const { log } = require('./globalUtil');

socket.on('connect', (dat) => {
	log("Connected to Freedeck");
})
socket.on("session_valid", () => { 
	log("Session valid!")
});
socket.on("session_invalid", () => { 
	log("Session invalid: kicked out")
});

auth()