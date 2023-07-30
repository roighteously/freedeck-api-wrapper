module.exports = {
	log: (msg, sockObj={}) => {
		if (sockObj.isCompanion) {
			console.log('[Companion] ' + msg);
		} else {
			console.log('[Main] ' + msg);
		}
	}
}