const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

module.exports = {
  "development": {
    "username": username,
    "password": password,
    "database": `${database}`,
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": username,
    "password": password,
    "database": `${database}`,
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": username,
    "password": password,
    "database": `${database}`,
    "host": "localhost",
    "dialect": "postgres"
  }
};
