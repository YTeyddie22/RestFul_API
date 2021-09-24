// Modules

//? Path module
const path = require('path');

//? File system modules
const { open, writeFile, readFile, unlink, close, ftruncate } = require('fs');

///////////////////////////////////////////////////////////////////

//!library for creating , reading and deleting data
const lib = {};

//*Base directories for the files

lib.baseDir = path.join(__dirname, '/../.data/');

//? Writing data to a file

lib.create = function (dir, fileName, data, callback) {
	//*Open the file for writing

	open(
		lib.baseDir + dir + '/' + fileName + '.json',
		'wx',
		(err, fileDescriptor) => {
			if (!err && fileDescriptor) {
				//* Convert the data to string

				let stringData = JSON.stringify(data);

				//* Write to the file and close the file

				writeFile(fileDescriptor, stringData, (err) => {
					if (!err) {
						close(fileDescriptor, (err) => {
							if (!err) {
								callback(false);
							} else {
								callback('Error closing new file');
							}
						});
					} else {
						callback('Error writing to new file');
					}
				});
			} else {
				callback('Could not create file, it may already exist');
			}
		}
	);
};

//? Read data from a file

lib.read = function (dir, fileName, callback) {
	readFile(
		lib.baseDir + dir + '/' + fileName + '.json',
		'utf-8',
		(err, data) => {
			callback(err, data);
		}
	);
};

//?Update data inside of  a file

lib.update = function (dir, fileName, data, callback) {
	//*Open file for Writing

	open(
		lib.baseDir + dir + '/' + fileName + '.json',
		'r+',
		(err, fileDescriptor) => {
			if (!err && fileDescriptor) {
				//* Convert the data to string

				let stringData = JSON.stringify(data);

				//* Truncate the file

				ftruncate(fileDescriptor, (err) => {
					if (!err) {
						//*Write to file and close file

						writeFile(fileDescriptor, stringData, (err) => {
							if (!err) {
								close(fileDescriptor, (err) => {
									if (!err) {
										callback(false);
									} else {
										callback('Error closing the file that is existing');
									}
								});
							} else {
								callback('Error writing to existing file');
							}
						});
					} else {
						callback('Error truncating file');
					}
				});
			} else {
				callback('Could not open file for updating. it may not exist');
			}
		}
	);
};

//? Deleting a file

lib.delete = function (dir, fileName, callback) {
	//*Unlinking

	unlink(lib.baseDir + dir + '/' + fileName + '.json', (err) => {
		if (!err) {
			callback(false);
		} else {
			callback('Error deleting file');
		}
	});
};

module.exports = lib;
