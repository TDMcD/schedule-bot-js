const {
  Client,
  EmbedBuilder,
  MessageFlags,
  ActivityType,
  Events,
  REST,
  Routes,
} = require("discord.js");
const { CommandKit } = require("commandkit");
const eventHandler = require("./handlers/eventHandler");
const getApplicationCommands = require("./utils/getApplicationCommands");
const { clientId } = require("../config.json");
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

// For deleting global commands
// client.on(Events.ClientReady, async () => {
//   const commands = await client.application.commands.fetch();

//   console.log(commands);

//   const rest = new REST().setToken(process.env.TOKEN);

//   rest
//     .delete(Routes.applicationCommand(clientId, "1179744763071701002"))
//     .then(() => console.log("Successfully deleted application command."))
//     .catch(console.error);
// });

eventHandler(client);

client.login(process.env.TOKEN);
