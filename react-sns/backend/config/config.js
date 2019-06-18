const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": "reactbird",
    "password": process.env.DB_PASSWORD,
    "database": "reactbird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "reactbird",
    "password": process.env.DB_PASSWORD,
    "database": "reactbird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "reactbird",
    "password": process.env.DB_PASSWORD,
    "database": "reactbird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
