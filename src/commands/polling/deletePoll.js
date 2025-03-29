const {
  Client,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");
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
      const idToDelete = interaction.options.get("id").value;
      const memberId = interaction.member.id;
      const guildId = interaction.guild.id;
      let rowCount, completionMessage;

      if (String(idToDelete).toLowerCase() === "all") {
        rowCount = await Poll.destroy({
          where: { member_id: memberId, guild_id: guildId },
        });
        if (rowCount > 0) {
          completionMessage = `${rowCount} polls were successfully deleted.`;
        } else {
          completionMessage = "No polls were deleted.";
        }

        // await interaction.editReply(`${rowCount} polls were successfully deleted.`);
        // return;
      } else if (!isNaN(Number(idToDelete))) {
        rowCount = await Poll.destroy({
          where: {
            id: Number(idToDelete),
            member_id: memberId,
            guild_id: guildId,
          },
        });
        if (rowCount > 0) {
          completionMessage = `Poll with ID "${idToDelete}" was successfully deleted.`;
        } else {
          completionMessage =
            "No polls were deleted. Are you sure you used the correct ID?";
        }
      } else {
        completionMessage =
          'Unable to process your delete request. Please ensure you\'ve entered a valid ID, or "all".';
      }

      await interaction.editReply(completionMessage);
    } catch (error) {
      console.log(`Poll list error: ${error}`);
    }
  },
  name: "delete-poll",
  description: "Lists the user's polls for this server.",
  options: [
    {
      name: "id",
      description:
        'The ID of the poll you want to delete. Use "all" to delete all of your polls.',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
};
