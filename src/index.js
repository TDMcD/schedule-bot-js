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

client.login(process.env.TOKEN);
