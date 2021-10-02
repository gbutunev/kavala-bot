const validateUser = require('../utils/user-validation.js');
const embedBuilder = require('../utils/song-embed.js');

module.exports = {
    name: 'resume',
    aliases: [],
    description: 'Resumes the paused song',
    async execute(message, args) {
        let player = message.client.player;

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue || !queue.connection) {
            message.channel.send('Nothing to resume');
            return;
        }


        if (queue.connection.paused) {
            queue.setPaused(false);
            let embed = embedBuilder.resume(queue);
            message.channel.send({ embeds: [embed] });
        }
        else {
            message.channel.send('I\'m still playing');
        }
    }
}