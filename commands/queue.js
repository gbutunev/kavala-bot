const validateUser = require('../utils/user-validation.js');
const embedBuilder = require('../utils/song-embed.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Shows player queue',
    async execute(message, args) {
        let player = message.client.player;

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue) {
            message.channel.send('Nothing is playing');
            return;
        }

        let embed = embedBuilder.queue(queue);
        message.channel.send({ embeds: [embed] });
    }
}