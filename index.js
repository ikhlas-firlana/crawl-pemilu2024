const { Handlers } = require('./handlers');
const { main } = require('./common/main/main');
const config = {
    "headless": true,
    "screenshot": true,
    "url": "https://pemilu2024.kpu.go.id/",
    "args": ["--no-sandbox",  "--window-size=2000,1080"],
    "viewPort": {
        "width": 2000,
        "height": 1024
    },
    "database": {
        "environment": {
            "DB_HOST": "database_test.sqlite"
        },
        "dialect": "sqlite"
    }
}

main({
    config,
    Handlers,
    url: config.url,
    name: 'pemilu2024',
    modelName: 'electionVotes'
})
