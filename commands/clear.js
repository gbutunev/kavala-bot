const validateUser = require('../utils/user-validation.js');

module.exports = {
    name: 'clear',
    aliases: [],
    description: 'Clears the queue',
    async execute(message, args) {
        let player = message.client.player;

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue) {
            message.channel.send('There is no queue to clear');
            return;
        }

        queue.clear();
    }
}