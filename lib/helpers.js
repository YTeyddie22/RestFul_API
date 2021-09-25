//!Modules

const crypto = require('crypto');

//? Dependency

const config = require('./config');

//Helper for tasks

const helpers = {};

//*Creating a hash

helpers.hash = function (str) {
	if (typeof str === 'string' && str.length > 0) {
		let hash = crypto
			.createHmac('sha256', config.hashingSecret)
			.update(str)
			.digest('hex');

		return hash;
	} else {
		return false;
	}
};

//*  PArse the JSON string to object without throwing an exception

helpers.parseJsonToObject = function (str) {
	try {
		let obj = JSON.parse(str);
		return obj;
	} catch (error) {
		return {};
	}
};

//!Export the module

module.exports = helpers;
