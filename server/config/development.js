'use strict';

module.exports = {
    PORT: 3000,
    DATABASE_URI: process.env.NODE_DB_URI || process.env.CLEARDB_DATABASE_URL || process.env.MONGODB_URI,
    // COLL_MAIN: "products",
    COLL_MAIN: "restaurants",
    COLL_USER: "users",
    LIMIT: 50
    // MongoDB Variables
    // MONGO_URI: 'mongodb://admin01:ims123@ds119370.mlab.com:19370',
    // MONGO_URI: 'mongodb://admin01:ims123@ds119370.mlab.com:19370/heroku_2rcb9ngt',
    // MONGO_URI: 'mongodb://localhost:27017/products',
    // MONGO_DB: 'heroku_2rcb9ngt',
    // MONGO_HOSTNAME: 'ds119370.mlab.com',
    // MONGO_PORT: 19370,
    // MONGO_USERNAME: 'admin01',
    // MONGO_PASSWORD: 'ims123'
    // MYSQL variables
    // domain_name: "http://localhost:3000",
    // PORT: 3000,
    // MYSQL_DB: 'employees_sample',
    // MYSQL_USERNAME: 'root',
    // MYSQL_PASSWORD: 'ims123!@#',
    // MYSQL_HOSTNAME: 'localhost',
    // MYSQL_PORT: 3306,
    // MYSQL_LOGGING: console.log,
    // version: '1.0.0'
};