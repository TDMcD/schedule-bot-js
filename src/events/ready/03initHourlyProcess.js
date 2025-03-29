const { Client } = require("discord.js");
const { Op } = require("sequelize");
const { Poll } = require("../../utils/db");
const pollGenerator = require("../../handlers/pollGenerator");
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  setInterval(async () => {
    try {
      const now = new Date();
      const todayDay = now
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      const todayDate = now.toISOString().split("T")[0];
      console.log(
        `Starting hourly process at ${now.toLocaleTimeString("en-US")}`
      );

      const pollsToRun = await Poll.findAll({
        where: {
          day_of_the_week: todayDay,
          [Op.or]: [
            { last_displayed: { [Op.ne]: todayDate } },
            { last_displayed: null },
          ],
        },
      });

      for (const poll of pollsToRun) {
        pollGenerator(client, poll.poll_text, poll.channel_id, poll.duration);
        await Poll.update(
          { last_displayed: todayDate },
          { where: { id: poll.id } }
        );
      }
    } catch (error) {
      console.log(`Error in hourly process: ${error}`);
    }
  }, 60 * 60 * 1000);
};
