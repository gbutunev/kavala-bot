const validateUser = require('../utils/user-validation.js');

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuf(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

module.exports = {
    name: 'shuffle',
    aliases: [],
    description: 'Shuffles the queue',
    async execute(message, args) {
        let player = message.client.player;

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue) {
            message.channel.send('Nothing to shuffle');
            return;
        }

        shuf(queue.tracks);

        message.channel.send('Queue shuffled ✅');
    }
}