const { io } = require("socket.io-client");
const { log } = require('./globalUtil');

module.exports = () => {
	const companion = io("ws://localhost:5754");
	companion.isCompanion = true;
}