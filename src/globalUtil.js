const cfg = require('../config.json');

module.exports = {
	log: (msg, sockObj={}) => {
		if (!cfg.log) return;
		if (sockObj.isCompanion) {
			console.log('[Companion] > ' + msg);
		} else {
			console.log('[Main] |> ' + msg);
		}
	}
}