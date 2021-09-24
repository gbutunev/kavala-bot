module.exports = function (message) {
    if (!message.member.voice.channel) {
        return 'You are not in a voice channel';
    }

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
        return 'You are not in the same voice channel';
    }

    return null;
}