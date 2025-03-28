const { Client, EmbedBuilder } = require("discord.js");
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

client.on("ready", (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot || message.author.id === client.user.id) {
    return;
  }
  console.log(message);
  const messageContent = message.content.toLowerCase();
  if (
    messageContent.includes("hi") ||
    messageContent.includes("hello") ||
    messageContent.includes("hey")
  ) {
    message.reply("Hey there!");
  } else if (messageContent === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed description.")
      .setColor("Random")
      .addFields(
        { name: "Field Title", value: "Some value.", inline: true },
        { name: "Second Field Title", value: "Some other value.", inline: true }
      );
    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed description.")
      .setColor("Random")
      .addFields(
        { name: "Field Title", value: "Some value.", inline: true },
        { name: "Second Field Title", value: "Some other value.", inline: true }
      );
    interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
