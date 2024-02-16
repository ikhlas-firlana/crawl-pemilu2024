const logging = (msg) => {
    if (process.env.NODE_ENV !=='production') {
        console.log(msg);
    }
    return true;
};
const configDefault = {}
const config = {
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || "database_development",
        host: process.env.DB_HOST ||  "127.0.0.1",
        port: process.env.DB_PORT || '3306',
        dialect: "mysql",
        pool: {
            max: parseInt(process.env.DB_POOL_MAX) || 1,
            min: parseInt(process.env.DB_POOL_MIN) || 0,
            acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 0,
            idle: parseInt(process.env.DB_POOL_IDLE) || 0,
        },
        logging,
        ...configDefault,
    },
    test: {
        dialect: "sqlite",
        logging,
        host: `${process.cwd()}/data/database_test.sqlite`,
        ...configDefault,
    },
    production: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || "database_production",
        host: process.env.DB_HOST ||  "127.0.0.1",
        port: process.env.DB_PORT || '3306',
        dialect: "mysql",
        pool: {
            max: parseInt(process.env.DB_POOL_MAX) || 1,
            min: parseInt(process.env.DB_POOL_MIN) || 0,
            acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 0,
            idle: parseInt(process.env.DB_POOL_IDLE) || 0,
        },
        logging,
        ...configDefault,
    }
};
module.exports = config;
