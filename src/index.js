const { io } = require("socket.io-client");
const socket = io("ws://localhost:5754");

socket.on('connect', (dat) => {
	console.log("Connected to Freedeck");
})
socket.on("data", (...data) => { 
	console.log(data)
});

// We'll need to authenticate w/ FD.
socket.emit("c2sr_login");