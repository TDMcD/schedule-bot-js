const {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { CommandKit } = require("commandkit");
require("dotenv").config();

const client = new Client({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "MessageContent",
    "GuildMessagePolls",
  ],
});

const roles = [
  {
    id: "1355206829256216747",
    label: "Red",
  },
  {
    id: "1355207134643621929",
    label: "Blue",
  },
  {
    id: "1355207233344110664",
    label: "Green",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1110717492525019188");
    if (!channel) {
      return;
    }

    const row = new ActionRowBuilder();
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Claim or remove a role below.",
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
