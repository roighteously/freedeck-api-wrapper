const { io } = require("socket.io-client");
const { log } = require('./globalUtil');
const shared = require("./shared");

module.exports = () => {
	const companion = io("ws://localhost:5754");
	companion.isCompanion = true;

	companion.logQueue = [];

	shared(companion);

	companion.on('connect', () => {
		companion.emit('c-connected');
		// Why does that bypass auth?? Quite dangerous
		log("Companion logged in", companion);

		setInterval(() => {
			companion.logQueue.forEach(obj => {
				companion.emit('c2s_log', `[Companion/${obj.sender}] ${obj.data}`);
				log(`Sent log [Companion/${obj.sender}] ${obj.data}`, companion);
				companion.logQueue.shift();
			})
		},20);
	});

	companion.on('set-theme', (themedat) => {
		log('This server is running theme ' + themedat, companion);
	})

	companion.on('server_shutdown', () => {
		log('Server shutting down', companion);
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

	companion.setTheme = (theme) => {
		if (!companion.themes[theme]) theme = "Default";
		companion.emit('c-theme', theme);
	}

	companion.log = (sender, data) => {
		companion.logQueue.push({sender, data})
	}

	return companion;
}