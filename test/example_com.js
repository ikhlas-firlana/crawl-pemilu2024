// const config = require('./config.json'); // load this in main
const config = {
    "headless": false,
    "screenshot": true,
    "url": "https://example.com",
    "args": ["--no-sandbox",  "--window-size=1920,1080"],
    "database": {
        "environment": {
            "DB_HOST": `example.sqlite`,
        },
        dialect: 'sqlite',
    }
};
const { Handlers } = require('./handlers');
const { main } = require('../common/main/main');

main({
    config,
    Handlers,
    url: config.url,
    name: 'example_com',
    modelName: 'articles'
}).then();
