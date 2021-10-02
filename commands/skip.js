const validateUser = require('../utils/user-validation.js');
const embedBuilder = require('../utils/song-embed.js');

module.exports = {
    name: 'skip',
    aliases: [],
    description: 'Skips the current song',
    async execute(message, args) {
        let player = message.client.player;

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue || !queue.connection) {
            message.channel.send('Nothing to skip');
            return;
        }

        //add now playing embed
        if (queue.tracks.length == 0) {
            message.channel.send('Reached the end of the queue');
        }
        else{
            let embed = embedBuilder.queue(queue);
            message.channel.send({ embeds: [embed] });
        }

        queue.skip();
    }
}