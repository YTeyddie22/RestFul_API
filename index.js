//? Libraries
//for http server;
const http = require('http');

//For the Url;
const url = require('url');

//String decoder for the payload

const { StringDecoder } = require('string_decoder');

/////////////////////////////////////////////////////////////////////////////////////

//?FILES
//importing the config file
const config = require('./config');

/////////////////////////////////////////////////////////////////////////////////////

//! 1. Creating a http server

const httpServer = http.createServer(function (req, res) {
	//*1. Get Url and parse it

	const parsedUrl = url.parse(req.url, true);

	//*7 get Query string object

	const queryStringObject = parsedUrl.query;

	//*2. Get the PAth

	const path = parsedUrl.pathname;

	//*3. Trim The Path for the address requested

	const trimPath = path.replace(/^\/+|\/+$/, '');

	//*6 Get the Method from the request method in the create Server Http Module

	const method = req.method.toLowerCase();

	//*8 Get the headers as objects

	let header = req.headers;

	//*9 Get the payload if any

	const decoder = new StringDecoder('utf-8');
	let buffer = '';

	req.on('data', function (data) {
		buffer += decoder.write(data);
	});
	req.on('end', function () {
		//*10. Check if payload has loaded or not.

		buffer += decoder.end();

		///////////////////////////////////////////////////////////////////////////////////////////////

		//*1 Choose handler request to go to and if handler not found

		const chosenHandler =
			typeof router[trimPath] !== 'undefined'
				? router[trimPath]
				: handlers.notFound;

		//////////////////////////////////////////////////////////////////////////////////////

		//*2. Generate object sent to the handlers

		const data = {
			trimPath: trimPath,
			queryStringObject: queryStringObject,
			method: method,
			header: header,
			payload: buffer,
		};

		///////////////////////////////////////////////////////////////////////////////////////////////////

		//*13. Route the data to the handler specified to the handler

		chosenHandler(data, function (statusCode, payload) {
			//*1 Use the status code called by the handler or default to status code 200

			statusCode = typeof statusCode === 'number' ? statusCode : 200;

			//*2 Use the payload called by the handler or default to empty object

			payload = typeof payload === 'object' ? payload : {};

			//*3 convert payload to a string

			const payloadString = JSON.stringify(payload);

			//*4 Return the content type to be JSON

			res.setHeader('Content-Type', 'application/json');

			//*4 Return the request statusCode

			res.writeHead(statusCode);

			//*4 Send the response payload as String

			res.end(payloadString);

			//*5 Get the request PAth

			console.log(`Returning this response: `, statusCode, payloadString);
		});
	});
});

//////////////////////////////////////////////////////////////////////////////////////////

//! 2 Start the server and it should be listening to a port

httpServer.listen(config.port, function () {
	console.log(`Server is listening on ${config.port}`);
});

///////////////////////////////////////////////////////////////////////////////////////

//?1. Creating a Handler object
const handlers = {};

//*1 Sample object
handlers.sample = function (data, callback) {
	//*Callback http status code and object Payload

	callback(406, { name: 'sample handler' });
};

//*2 Not found handlers

handlers.notFound = function (data, callback) {
	callback(404);
};

///////////////////////////////////////////////////////////////////////////////////////////

//!3. Creating a request router
const router = {
	sample: handlers.sample,
};
