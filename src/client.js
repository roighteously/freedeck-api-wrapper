const { io } = require("socket.io-client");

const config = require('../config.json');
const auth = require('./client/auth');
const shared = require("./shared");

module.exports = () => {
	const socket = io("ws://localhost:5754");

	shared(socket)
	socket.on('connect', () => {
		auth(config.loginID, config.passwd, socket);
	})
	return socket;
}