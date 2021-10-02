const validateUser = require('../utils/user-validation.js');

module.exports = {
    name: 'leave',
    aliases: [],
    description: 'Leaves the voice channel',
    async execute(message, args) {
        let player = message.client.player;

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue || !queue.connection) {
            message.channel.send('I\'m not even in a voice channel');
            return;
        }

        queue.destroy(true);
    }
}