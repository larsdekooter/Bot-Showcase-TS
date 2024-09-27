import Event from "../Structures/Event.js";
import { DiscordjsErrorCodes } from "discord.js";

export default new Event("interactionCreate", async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(interaction, client);
    } catch (error) {
      console.error(error);
      try {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } catch {
        if (error.code === DiscordjsErrorCodes.InteractionAlreadyReplied) {
          await interaction.editReply({
            content: "There was an error while executing this command!",
          });
        }
      }
    }
  } else if (interaction.isContextMenuCommand()) {
    const command = client.contextMenuCommands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(interaction, client);
    } catch (error) {
      console.error(error);
      try {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } catch {
        if (error.code === DiscordjsErrorCodes.InteractionAlreadyReplied) {
          await interaction.editReply({
            content: "There was an error while executing this command!",
          });
        }
      }
    }
  }
});
