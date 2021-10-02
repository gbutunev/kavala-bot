const { MessageEmbed } = require('discord.js');

function startOneSong(track) {
    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(track.title)
        .setURL(track.url)
        .setAuthor('▶ Started playing')
        .setThumbnail(track.thumbnail)
        .setDescription(`Duration: ${track.duration}`);

    return embed;
}

function startOnePlaylist(playlist) {
    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(playlist.title)
        .setURL(playlist.url)
        .setAuthor('▶ Started a playlist')
        .setThumbnail(playlist.thumbnail)
        .setDescription(`Songs: ${playlist.tracks.length}`);

    return embed;
}

function addOneSong(addedTrack, currentTrack, isPaused) {
    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(addedTrack.title)
        .setURL(addedTrack.url)
        .setAuthor('Added to queue')
        .setThumbnail(addedTrack.thumbnail)
        .setDescription(`Duration: ${addedTrack.duration}`)
        .addField(isPaused ? 'Current song (paused)' : 'Now playing', currentTrack.title);

    return embed;
}

function addPlaylist(addedPlaylist, currentTrack, isPaused) {
    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(addedPlaylist.title)
        .setURL(addedPlaylist.url)
        .setAuthor('Added playlist to queue')
        .setThumbnail(addedPlaylist.thumbnail)
        .setDescription(`${addedPlaylist.tracks.length} songs added to queue`)
        .addField(isPaused ? 'Current song (paused)' : 'Now playing', currentTrack.title);

    return embed;
}

function addOneSongToBeginning(addedTrack, currentTrack, isPaused) {
    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(addedTrack.title)
        .setURL(addedTrack.url)
        .setAuthor('Playing next')
        .setThumbnail(addedTrack.thumbnail)
        .setDescription(`Duration: ${addedTrack.duration}`)
        .addField(isPaused ? 'Current song (paused)' : 'Now playing', currentTrack.title);

    return embed;
}

function addPlaylistToBeginning(addedPlaylist, currentTrack, isPaused) {
    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(addedPlaylist.title)
        .setURL(addedPlaylist.url)
        .setAuthor('Added playlist to beginning')
        .setThumbnail(addedPlaylist.thumbnail)
        .setDescription(`${addedPlaylist.tracks.length} songs added to the beginning of the queue`)
        .addField(isPaused ? 'Current song (paused)' : 'Now playing', currentTrack.title);

    return embed;
}

function resume(queue) {
    let resumedSong = queue.previousTracks[queue.previousTracks.length-1];

    //add more info later

    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(resumedSong.title)
        .setURL(resumedSong.url)
        .setAuthor('Resuming')
        .setThumbnail(resumedSong.thumbnail)
        .setDescription(`Songs left in queue: ${queue.tracks.length}`);

    return embed;
}

function queue(queue) {
    let currentSong = queue.previousTracks[queue.previousTracks.length-1];
    let nextSongs = queue.tracks;
    let nextSongNumber = queue.tracks.length;


    let embed = new MessageEmbed()
        .setColor('#B58320')
        .setTitle(currentSong.title)
        .setURL(currentSong.url)
        .setAuthor('Songs in queue')
        .setThumbnail(currentSong.thumbnail)
        .setDescription(queue.connection.paused ? 'Paused ⏸' : 'Playing ▶');

    if (nextSongNumber == 0) {
        embed.addField('Next songs', 'No other songs');
    }
    else if (nextSongNumber <= 5) {
        let fields = [];
        nextSongs.forEach(song => {
            fields.push({
                name: song.author,
                value: song.title
            });
        });
        embed.addFields(fields);
    } else {
        let fields = [];
        for (let i = 0; i < 5; i++) {
            fields.push({
                name: nextSongs[i].author,
                value: nextSongs[i].title
            });
        }
        embed.addFields(fields);
        embed.addField('Next songs', `${nextSongNumber - 5} more songs`);
    }

    return embed;
}

module.exports = {
    startOneSong,
    startOnePlaylist,
    addOneSong,
    addPlaylist,
    addOneSongToBeginning,
    addPlaylistToBeginning,
    resume,
    queue
}