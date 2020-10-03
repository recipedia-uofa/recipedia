// @flow

export type Environment = {
  debug: boolean,
  deployUrl: string,
  serverUrl: string,
};

const dev: Environment = {
  debug: true,
  deployUrl: "http://localhost:3000",
  // serverUrl: "http://localhost:9000",
  serverUrl: "http://www.recipedia.ca:9000",
};

const prod: Environment = {
  debug: false,
  deployUrl: "http://www.recipedia.ca",
  serverUrl: "http://www.recipedia.ca:9000",
}

let env: Environment;

if (process.env.RCP_ENV === 'prod') {
  env = prod;
} else {
  env = dev;
}

export default env;
