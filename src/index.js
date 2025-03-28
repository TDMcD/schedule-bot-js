const {
  Client,
  EmbedBuilder,
  MessageFlags,
  ActivityType,
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

let status = [
  {
    name: "Pathfinder 2E",
    type: ActivityType.Playing,
  },
  {
    name: "D&D 5e",
    type: ActivityType.Playing,
  },
  {
    name: "Traveller",
    type: ActivityType.Playing,
  },
  {
    name: "D&D 3.5e",
    type: ActivityType.Playing,
  },
];

client.on("ready", (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 15000);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    try {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.editReply({
          content: "I couldn't find that role.",
        });
        return;
      }

      const hasRole = interaction.member.roles.cache.has(role.id);
      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      } else {
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// client.on("messageCreate", (message) => {
//   if (message.author.bot || message.author.id === client.user.id) {
//     return;
//   }
//   console.log(message);
//   const messageContent = message.content.toLowerCase();
//   if (
//     messageContent.includes("hi") ||
//     messageContent.includes("hello") ||
//     messageContent.includes("hey")
//   ) {
//     message.reply("Hey there!");
//   }
// });

// client.on("interactionCreate", (interaction) => {
//   if (!interaction.isChatInputCommand()) {
//     return;
//   }

//   if (interaction.commandName === "embed") {
//     const embed = new EmbedBuilder()
//       .setTitle("Embed Title")
//       .setDescription("This is an embed description.")
//       .setColor("Random")
//       .addFields(
//         { name: "Field Title", value: "Some value.", inline: true },
//         { name: "Second Field Title", value: "Some other value.", inline: true }
//       );
//     interaction.reply({ embeds: [embed] });
//   }
// });

client.login(process.env.TOKEN);
