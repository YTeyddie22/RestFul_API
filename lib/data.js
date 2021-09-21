//? Dependancies

const path = require('path');
const fs = require('fs');

///////////////////////////////////////////////////////////////////

//!library for creating , reading and deleting data
const lib = {};

//* Base directories for the files

lib.baseDir = path.join(__dirname, '/../.data/');
//? Writing data to a file

lib.create = function (dir, fileName, data, callback) {
	//*Open the file for writing

	/**
	 * Come back for this later
	 */

	fs.open(
		lib.baseDir,
		+dir + '/' + file + '.json',
		'wx',
		function (err, fileDescriptor) {}
	);
};

module.exports = lib;
