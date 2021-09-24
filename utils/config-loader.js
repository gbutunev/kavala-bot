const fs = require('fs');

function loadConfig() {

    const folderPath = './';
    const filePath = './config.json';

    const defaultConfigContent = {
        prefix: '.',
        token: 'ENTER_DISCORD_TOKEN_HERE'
    }

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultConfigContent, null, '\t'));

        throw new Error('Config file was not found. Please open the newly created one and fill in the necessary information.');
    }

    let config = require('../config.json');
    for (const key in config) {
        if (Object.hasOwnProperty.call(config, key)) {
            if (config[key].includes('ENTER')) {
                throw new Error(`Config file not set up! Please enter value of "${key}" in config.json!`);
            }
        }
    }

    return config;
}

module.exports = loadConfig;