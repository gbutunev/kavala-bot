const embedBuilder = require('../utils/song-embed.js');
const validateUser = require('../utils/user-validation.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Plays a given song or resumes queue',
    async execute(message, args) {
        let player = message.client.player;
        let query = args.join(' ');
        let isFirst = false;

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

        if (queue && !query) {
            queue.setPaused(false);
            return;
        }

        if (!queue) {
            isFirst = true;
            queue = player.createQueue(message.guild, {
                metadata: {
                    channel: message.channel
                }
            });
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

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch (e) {
            message.channel.send('Could not connect. Possibly this is a private voice channel.');
            return;
        }

        if (!queue.playing) {
            queue.play();
        }

        let embed;
        if (isFirst) {
            if (result.playlist) {
                //start a playlist
                embed = embedBuilder.startOnePlaylist(result.playlist);
            }
            else {
                //start a song
                embed = embedBuilder.startOneSong(firstSong);
            }
        }
        else {
            if (result.playlist) {
                //add a playlist to the queue
                embed = embedBuilder.addPlaylist(result.playlist, queue.previousTracks[0], queue.connection.paused);
            }
            else {
                //add a song to the queue
                embed = embedBuilder.addOneSong(firstSong, queue.previousTracks[0], queue.connection.paused);
            }
        }

        message.channel.send({ embeds: [embed] });
    }
}