const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  Client,
  Interaction,
  MessageFlags,
} = require("discord.js");
const { Poll } = require("../../utils/db");
const pollGenerator = require("../../handlers/pollGenerator");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const day = interaction.options.get("day").value;
      const text = interaction.options.get("text").value;
      const channelId = interaction.options.get("channel").value;
      const immediate = interaction.options.get("immediate").value;
      const duration = interaction.options.get("duration")?.value ?? 24;
      let lastDisplayed = null;

      const pollList = await Poll.findAll({
        where: {
          member_id: interaction.member.id,
          guild_id: interaction.guild.id,
        },
      });
      if (pollList.length >= 25) {
        await interaction.editReply(
          "You already have 25 polls on this server. To add a new poll, you must first delete an existing poll."
        );
        return;
      }

      const now = new Date();
      const todayDay = now
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

      if (immediate && day === todayDay) {
        pollGenerator(client, text, channelId, duration);
        lastDisplayed = now.toISOString().split("T")[0];
      }

      await Poll.create({
        poll_text: text,
        day_of_the_week: day,
        duration: duration,
        channel_id: channelId,
        member_id: interaction.member.id,
        guild_id: interaction.guildId,
        last_displayed: lastDisplayed,
      });

      // console.log(`--Poll setup-- Day: ${day}`);
      // console.log(`--Poll setup-- Text: ${text}`);
      // console.log(`--Poll setup-- ChannelId: ${channelId}`);
      // console.log(`--Poll setup-- Immediate: ${immediate}`);
      //   console.log(`TypeOf duration: ${typeof duration}`);

      await interaction.editReply("Poll setup complete.", {
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.log(`Error on poll setup callback: ${error}`);
    }
  },
  name: "poll-setup",
  description: "Set up a weekly attendance (y/n) poll.",
  options: [
    {
      name: "day",
      description: "The day of the week to run the poll.",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Monday",
          value: "monday",
        },
        {
          name: "Tuesday",
          value: "tuesday",
        },
        {
          name: "Wednesday",
          value: "wednesday",
        },
        {
          name: "Thursday",
          value: "thursday",
        },
        {
          name: "Friday",
          value: "friday",
        },
        {
          name: "Saturday",
          value: "saturday",
        },
        {
          name: "Sunday",
          value: "sunday",
        },
      ],
    },
    {
      name: "immediate",
      description:
        "If the poll's day of the week is today, do you want it posted now?",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
    {
      name: "text",
      description: "The text for the poll.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "The channel for the poll.",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "duration",
      description: "The poll's duration, in hours. Defaults to 24.",
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
  ],
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  //   deleted: Boolean,
};
