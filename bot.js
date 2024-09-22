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

function sendMessage(channelId, message) {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    return channel.send(message);
  } else {
    throw new Error('Channel tidak ditemukan');
  }
}

module.exports = { client, isConnected, sendMessage };
