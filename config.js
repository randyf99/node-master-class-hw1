// Main container
var environments = {};

// Development environment (default)
environments.development = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'development'
};

// Production environment
environments.production = {
  httpPort: 8000,
  httpsPort: 8001,
  envName: 'production'
};

// Which environment is set?
var currentEnvironment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Verify environment
var exportedEnvironment =
  typeof environments[currentEnvironment] == 'object' ? environments[currentEnvironment] : environments.development;

// Export the module
module.exports = exportedEnvironment;
