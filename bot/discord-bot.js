const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let isConnected = false;

client.once('ready', () => {
  console.log(`Bot telah login sebagai ${client.user.tag}`);
  isConnected = true;
});

client.on('disconnect', () => {
  isConnected = false;
});

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = { client, isConnected };
