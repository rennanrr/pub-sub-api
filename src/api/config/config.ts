/**
 * Default config for all environment types
 * @type {{db: string, apiPort: number}}
 */
const defaultConfig = {
  apiPort: 3000,
  rabbitMQ: 'amqp://localhost:5672',
  wsPort: 4555
};
export type Environment = "prod" | "dev" | "test";
/**
 * Enviroment specific configuration
 * @type {{prod: {}, dev: {}, test: {apiPort: number}}}
 */
const envConfig = {
  prod: {
    apiPort: process.env.PORT,
    rabbitMQ: 'amqp://localhost:5672',
    wsPort: process.env.PORT
  },
  dev: {
    apiPort: 3000,
    rabbitMQ: 'amqp://localhost:5672',
    wsPort: 4555
  },
  test: {
    apiPort: 3000,
  }
};

/**
 * Loads config based on the current environment
 * @returns {*}
 */
function loadConfig() {

  let env: Environment = (process.env.NODE_ENV || 'dev') as Environment;

  if (!envConfig[env]) {
    throw new Error(
      `Environment config for environment '${env}' not found. process.env.NODE_ENV must be one of '${Object.keys(
        envConfig
      )}'`
    );
  }

  console.log('[INFO] config loaded for environment: ', env);

  // merge default config with environment specific config
  return Object.assign({}, defaultConfig, envConfig[env]);
}

export default loadConfig();
