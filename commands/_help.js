module.exports = {
    name: 'help',
    aliases: ['halp', '?'],
    description: 'Shows this info message',
    async execute(message, args) {
        let output = 'Available commands:\n';
        for (const cmd of message.client.commandList) {
            let cmdLine = `- \`${message.client.config.prefix}${cmd.name}\` `;
            cmd.aliases.forEach(alias => {
                cmdLine += ` or \`${message.client.config.prefix}${alias}\``;
            });
            cmdLine += ` - ${cmd.description}`;

            output += `${cmdLine}\n`;
        }

        message.channel.send(output);
    }
}