const {
  Client,
  EmbedBuilder,
  MessageFlags,
  ActivityType,
  Events,
} = require("discord.js");
const { CommandKit } = require("commandkit");
const eventHandler = require("./handlers/eventHandler");
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

eventHandler(client);

client.login(process.env.TOKEN);
