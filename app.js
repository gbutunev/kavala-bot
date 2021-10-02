const Discord = require('discord.js');
const { Player } = require('discord-player');

const loadConfig = require('./utils/config-loader.js');
const loadCommands = require('./utils/command-loader.js');

const package = require('./package.json');
const config = loadConfig();

const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES]
});

client.commands = new Discord.Collection();
client.commandList = [];
client.player = new Player(client);
client.config = config;

loadCommands(client);

client.on('messageCreate', message => {
    const prefix = config.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot || message.content === prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            message.reply('Oopsie. Who shit myself?');
            console.log(message.content);
            console.log(error);
        }
    }
})

client.once('ready', () => {
    console.log(`${package.name} ${package.version} started successfully`);
    client.user.setActivity(`${config.prefix}help`, { type: 'LISTENING' });
});

client.login(config.token);