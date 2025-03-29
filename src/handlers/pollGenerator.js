const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = (client, text, channelId, duration) => {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel.send({
      poll: {
        question: { text: text },
        answers: [
          { text: "Yes", emoji: "👍" },
          { text: "No", emoji: "👎" },
        ],
        allowMultiSelect: false,
        duration: duration,
      },
    });
  }
};
