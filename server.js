const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { client, isConnected, sendMessage } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/status', (req, res) => {
  res.json({ connected: isConnected });
});

app.all('/submit', async (req, res) => {
  let name, message;

  if (req.method === 'GET') {
    name = req.query.name;
    message = req.query.message;
  } else if (req.method === 'POST') {
    name = req.body.name;
    message = req.body.message;
  }

  if (!name || !message) {
    return res.status(400).json({ status: 'error', message: 'Name dan message harus disediakan' });
  }

  try {
    await sendMessage(process.env.DISCORD_CHANNEL_ID, `Pesan baru dari ${name}: ${message}`);
    res.status(200).json({ status: 'success', message: 'Pesan berhasil dikirim ke Discord' });
  } catch (error) {
    console.error('Error sending message to Discord:', error);
    res.status(500).json({ status: 'error', message: 'Gagal mengirim pesan ke Discord' });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
