import Command from "../Structures/Command.js";
import { SlashCommandBuilder } from "discord.js";
export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot"),
  async run(interaction, client) {
    const message = await interaction.reply({
      content: `Pong!\n\`${client.ws.ping}ms\`\n${
        new Date().getTime() - interaction.createdTimestamp
      }ms`, fetchReply: true,
    });
    await interaction.editReply(message.content + `\n${new Date().getTime() - message.createdTimestamp}ms`)
  },
});
