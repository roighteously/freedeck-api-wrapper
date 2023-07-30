const { log } = require('../globalUtil');

module.exports = (loginID, passwd, socket) => {
	// We'll need to authenticate w/ FD.
	socket.emit("c2sr_login", loginID);
	socket.loginTries = 0;

	socket.on("s2ca_login", (loc) => {
		log("Our login ID is " + loginID);
		log("Redirect: " + loc)
		socket.emit("c2sr_login_cont", loginID);
	})

	socket.on('user_ack_cont', (dat) => {
		if (dat === 'session_expired') {
			log('Not allowed to continue login');
			log('Retrying..');
			socket.emit("c2sr_login", loginID);
			socket.loginTries++;
		} else {
			log("Password protected server; using configured password");
			socket.emit('c2sd_login', passwd);
		}
	})

	socket.on('s2cs_login', (sessionID, loc) => {
		log('Successfully authenticated with API.');
		log('Our session ID is ' + sessionID);
		log('Redirect: ' + loc);
	})

	socket.on('s2ca_incorrect_pass', () => {
		log('Incorrect password, retrying. [Tries: ' + socket.loginTries + ' ]');
		socket.emit('c2sd_login', passwd);
		socket.loginTries++;
	})
}