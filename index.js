const config = require('./config.json');
const { Handlers } = require('./handlers');
const { main } = require('./common/main/main');

main({
    config,
    Handlers,
    url: config.url,
    name: 'pemilu2024',
    modelName: 'electionVotes'
})
