import { ApplicationIntegrationType, SlashCommandBuilder } from "discord.js";
import Command from "../Structures/Command.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Repeat a message, to let a bot say it")
    .addStringOption((o) =>
      o
        .setName("message")
        .setDescription("The message to repeat")
        .setRequired(true)
    )
    .setIntegrationTypes(ApplicationIntegrationType.UserInstall),
  async run(interaction, client) {
    const message = interaction.options.getString("message", true);
    return await interaction.reply({ content: message });
  },
});
