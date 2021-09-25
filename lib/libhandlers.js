//Modules

//? Dependency

const _data = require('./data');
const helpers = require('./helpers');

//?1. Creating request Handlers

const handlers = {};

//*1 Sample object
handlers.ping = function (data, callback) {
	//*Callback http status code and object Payload

	callback(200);
};

//*2 Users object

handlers.users = function (data, callback) {
	let methodsAccepted = ['get', 'post', 'put', 'delete'];

	if (methodsAccepted.indexOf(data.method) > -1) {
		handlers._users[data.method](data, callback);
	} else {
		callback(405);
	}
};

//* Users Sub-methods

handlers._users = {};

/**
 * Required fields
 *
 * 1 first Name
 * 2 last Name
 * 3 phone number
 * 4 password
 * 5 tosAgreement
 */

//? Users Get-methods

handlers._users.get = function (data, callback) {};

//? Users Post-methods

handlers._users.post = function (data, callback) {
	//Check all required fields are Put

	/**
	 * @todo the fields are not yet found
	 */

	let firstName =
		typeof data.payload.firstName === 'string' &&
		data.payload.firstName.trim().length > 0
			? data.payload.firstName.trim()
			: false;
	let lastName =
		typeof data.payload.lastName === 'string' &&
		data.payload.lastName.trim().length > 0
			? data.payload.lastName.trim()
			: false;
	let phoneNumber =
		typeof data.payload.phoneNumber === 'string' &&
		data.payload.phoneNumber.trim().length === 10
			? data.payload.phoneNumber.trim()
			: false;
	let password =
		typeof data.payload.password === 'string' &&
		data.payload.password.trim().length > 0
			? data.payload.password.trim()
			: false;
	let tosAgreement =
		typeof data.payload.tosAgreement === 'boolean' &&
		data.payload.tosAgreement === true
			? true
			: false;

	if (firstName && lastName && phoneNumber && password && tosAgreement) {
		//* 1Make sure user doesn't exist before

		_data.read('users', phoneNumber, function (err, data) {
			if (err) {
				//Hash the password with crypto hash
				const hashedPassword = helpers.hash(password);

				if (hashedPassword) {
					//* Create user objects

					const userObject = {
						firstName: firstName,
						lastName: lastName,
						phoneNumber: phoneNumber,
						hashedPassword: hashedPassword,
						tosAgreement: true,
					};

					//*Store thr users

					_data.create('users', phoneNumber, userObject, function (err) {
						if (!err) {
							callback(200);
						} else {
							console.log(err);
							callback(500, { Error: 'Could not create user' });
						}
					});
				} else {
					callback(500, { Error: 'Could not hash user password' });
				}
			} else {
				//User already exists
				callback(400, { Error: 'User with phone number already exists' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields' });
	}
};

//? Users Put-methods

handlers._users.put = function (data, callback) {};

//? Users Delete-methods
handlers._users.delete = function (data, callback) {};

//*3 Not found handlers

handlers.notFound = function (data, callback) {
	callback(404);
};

///////////////////////////////////////////////////////////////////////////////////////////

module.exports = handlers;
