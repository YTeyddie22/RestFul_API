//Create and export varables

//!Enviroments

const environments = {};

//*Staging
environments.staging = {
	port: 3000,
	envName: 'production',
};

//*Production
environments.production = {
	port: 5000,
	envName: 'production',
};

//*Determine which env is current

const curEnvironment =
	typeof process.env.NODE_ENV === 'string'
		? process.env.NODE_ENV.toLowerCase()
		: '';

//*Which env is exported
const selectedEnvironment =
	typeof environments[curEnvironment] === 'object'
		? environments[curEnvironment]
		: environments.staging;

module.exports = selectedEnvironment;
