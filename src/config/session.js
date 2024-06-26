let dotenv = require('dotenv')
let express = require('express');
let Sequelize = require('sequelize');
let session = require('express-session');
dotenv.config();

// initalize sequelize with session store
let SequelizeStore = require('connect-session-sequelize')(session.Store);

let sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: "mysql",
        storage: "./session.mysql",
        logging: false,

        dialectOptions: {
            "dateStrings": true,
            "typeCast": true,
            "timezone": "+07:00"
        },
        timezone: "+07:00"
    }
);

let sessionStore = new SequelizeStore({
    db: sequelize
});

let configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "secret",
        store: sessionStore,
        resave: false,
        proxy: true,
        saveUninitialized: false,
        cookie : { httpOnly: false, secure : false, maxAge : (24 * 60 * 60 * 1000)} // 1day
    }))
};

sessionStore.sync();

module.exports = {
    configSession: configSession
};


