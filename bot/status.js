const { isConnected } = require('../bot/discord-bot');

module.exports = (req, res) => {
  res.status(200).json({ connected: isConnected });
};
