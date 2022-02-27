

// Require the necessary discord.js classes
const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands'); //WOK
const path = require('path'); // WOK PATH
const dotenv = require('dotenv');
const keepAlive = require('./server.js');
dotenv.config();
const { Intents } = DiscordJS
// Create a new client instance
const client = new DiscordJS.Client({
    // These intents are recommended for the built in help menu
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  })

// When the client is ready, run this code (only once)
client.once('ready', () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands')
    })
	console.log('Ready!');
});

// Login to Discord with your client's token

keepAlive();
client.login(process.env.TOKEN);
setInterval(()=>{
  client.user.setActivity("!tribu");
},5000)
