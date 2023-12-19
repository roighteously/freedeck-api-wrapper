const path = require('path');

try {
	require('fs').readFileSync(path.resolve('./config.json'))
} catch(err) {
	console.log('config non existant. creating')
	require('fs').copyFileSync(path.resolve('./config.json.default'), path.resolve('./config.json'))
}


const companionInit = require('./companion');
const clientInit = require('./client');

// Init companion client
const companion = companionInit();
companion.log("Sender", "Data");

const client = clientInit();