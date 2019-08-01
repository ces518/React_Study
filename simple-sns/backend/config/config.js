const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development": {
        "username": "simple_sns",
        "password": process.env.DB_PASSWORD,
        "database": "simple_sns",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "simple_sns",
        "password": process.env.DB_PASSWORD,
        "database": "simple_sns",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "simple_sns",
        "password": process.env.DB_PASSWORD,
        "database": "simple_sns",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
