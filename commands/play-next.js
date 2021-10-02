const embedBuilder = require('../utils/song-embed.js');
const validateUser = require('../utils/user-validation.js');
const play = require('./play.js');

module.exports = {
    name: 'playnext',
    aliases: ['pn', 'play-next'],
    description: 'Adds a song or playlist to the beginning of the queue',
    async execute(message, args) {
        let player = message.client.player;
        let query = args.join(' ');

        let output = validateUser(message);
        if (output) {
            message.channel.send(output);
            return;
        }

        let queue = player.getQueue(message.guild);

        if (!queue && !query) {
            message.channel.send('No song name or url provided');
            return;
        }

        if (!queue) {
            play(message, args);
            return;
        }

        const result = await player.search(query, {
            requestedBy: message.user
        });

        let firstSong = result.tracks[0];
        if (!firstSong) {
            message.channel.send('No song found');
            return;
        }

        result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(firstSong);

        if (!queue.playing) {
            queue.play();
        }

        let embed;

        if (result.playlist) {
            //add a playlist to the queue
            embed = embedBuilder.addPlaylistToBeginning(result.playlist, queue.previousTracks[0], queue.connection.paused);
        }
        else {
            //add a song to the queue
            embed = embedBuilder.addOneSongToBeginning(firstSong, queue.previousTracks[0], queue.connection.paused);
        }


        message.channel.send({ embeds: [embed] });
    }
}