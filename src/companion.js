const { io } = require("socket.io-client");
const { log } = require('./globalUtil');

module.exports = () => {
	const companion = io("ws://localhost:5754");
	companion.isCompanion = true;

	companion.on('connect', () => {
		companion.emit('c-connected');
		// Why does that bypass auth?? Quite dangerous
		log("Companion logged in", companion);
	});

	companion.sendReset = () => {
		companion.emit('c-reset');
	};

	companion.themes = {
		DEFAULT: "Default",
		FUN: "Fun",
		DARK: "Dark",
		BLUE: "Blue",
		YELLOW: "Yellow",
		GREEN: "Green",
		CATPPUCCIN: "Catppuccin Mocha",
		COMPACT: "Compact Default"
	};

	companion.log = (sender, data) => {
		companion.emit('c2s_log', `[Companion/${sender}] ${data}`);
		log(`[${sender}: ${data}] logged`, companion);
	}

	return companion;
}