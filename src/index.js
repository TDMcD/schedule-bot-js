const {
  Client,
  EmbedBuilder,
  MessageFlags,
  ActivityType,
  Events,
  REST,
  Routes,
  Poll,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const getApplicationCommands = require("./utils/getApplicationCommands");
const { clientId } = require("../config.json");
const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
// Load environment-specific .env file
dotenv.config({ path: `.env.${env}` });

const client = new Client({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "MessageContent",
    "GuildMessagePolls",
  ],
});

// client.on(Events.ClientReady, async () => {
//   const channel = client.channels.cache.get("1110717492525019188");
//   if (channel) {
//     channel.send({
//       poll: {
//         question: { text: "Are you going to play the Pathfinder tonight?" },
//         answers: [
//           { text: "Yes", emoji: "👍" },
//           { text: "No", emoji: "👎" },
//         ],
//         allowMultiSelect: false,
//         duration: 12,
//       },
//     });
//   }
// });

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

// Delete commands
// client.on(Events.ClientReady, () => {
//   // For guild commands
//   const guild = client.guilds.cache.get("1110717491904270356");
//   guild.commands.set([]);
//   // For application commands
//   client.application.commands.set([]);
// });

eventHandler(client);

client.login(process.env.TOKEN);
