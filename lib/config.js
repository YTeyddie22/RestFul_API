//Create and export variables

//!Environments

const environments = {};

//*Staging
environments.staging = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: 'staging',
	hashingSecret: 'thisIsASecret',
};

//*Production
environments.production = {
	httpPort: 5000,
	httpsPort: 5001,
	envName: 'production',
	hashingSecret: 'thisIsASecret',
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
