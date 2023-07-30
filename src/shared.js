const { log } = require('./globalUtil');

module.exports = (sock) => {
	sock.on('connect', () => {
		log("Connected to Freedeck", sock);
	})
	sock.on("session_valid", () => { 
		log("Session valid!", sock);
	});
	sock.on("session_invalid", () => { 
		log("Session invalid: kicked out", sock);
	});
}