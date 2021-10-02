const validateUser = require('../utils/user-validation.js');

module.exports = {
    name: 'pause',
    aliases: ['stop'],
    description: 'Pauses the current song',
    async execute(message, args) {
        let player = message.client.player;

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue || !queue.connection) {
            message.channel.send('Nothing is playing');
            return;
        }

        if (queue.connection.paused) {
            message.channel.send('Already paused ⏸');
        }
        else {
            queue.setPaused(true);
            message.channel.send('Alright, pausing');
        }
    }
}