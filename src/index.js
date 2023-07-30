const companionInit = require('./companion');
const clientInit = require('./client');

// Init companion client
const companion = companionInit();
companion.log("Sender", "Data");

const client = clientInit();