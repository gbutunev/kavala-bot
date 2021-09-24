const fs = require('fs');

module.exports = function (client) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        try {
            const command = require(`../commands/${file}`);

            client.commandList.push(command);

            client.commands.set(command.name, command);
            command.aliases.forEach(alias => {
                client.commands.set(alias, command);
            });
        } catch (error) {
            console.error(`=== ${file} was NOT added ===`);
        }
    }
}