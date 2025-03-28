const { Client } = require("discord.js");
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
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`The sum is ${num1 + num2}`);
  }
});

client.login(process.env.TOKEN);
