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

module.exports = {
    startOneSong,
    startOnePlaylist
}