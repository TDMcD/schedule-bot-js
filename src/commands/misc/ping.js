const { Client } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Replies with the bot's ping!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  //   deleted: Boolean,
  /**
   *
   * @param {Client} client
   * @param {import("discord.js").Interaction} interaction
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(
      `Pong! Client: ${ping}ms, Websocket: ${client.ws.ping}ms`
    );
    console.log(`interaction.guildId: ${interaction.guildId}`);
    console.log(`interaction.guild.id: ${interaction.guild.id}`);
  },
};
