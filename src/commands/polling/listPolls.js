const { Client, EmbedBuilder } = require("discord.js");
const { Poll } = require("../../utils/db");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {import("discord.js").Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();
      const memberId = interaction.member.id;
      const guildId = interaction.guild.id;

      const pollList = await Poll.findAll({
        where: { member_id: memberId, guild_id: guildId },
      });

      const pollListEmbed = new EmbedBuilder()
        .setColor("Gold")
        .setTitle("Polls")
        .setDescription("These are your polls on this server.")
        // .setTimestamp()
        .setFooter({
          text: 'To delete a single poll, use "/delete-poll <id>". To delete all polls, use "/delete-poll all"',
        });

      for (const poll of pollList) {
        const day_of_the_week =
          String(poll.day_of_the_week).charAt(0).toUpperCase() +
          String(poll.day_of_the_week).slice(1);
        pollListEmbed.addFields({
          name: `${poll.poll_text}`,
          value:
            `ID: ${poll.id}\n` +
            `Day of the week: ${String(day_of_the_week)}\n` +
            `Duration: ${poll.duration} hours\n` +
            `Last Posted: ${poll.last_displayed ?? "never"}`,
        });
      }

      await interaction.editReply({ embeds: [pollListEmbed] });
    } catch (error) {
      console.log(`Poll list error: ${error}`);
    }
  },
  name: "list-polls",
  description: "Lists the user's polls for this server.",
};
