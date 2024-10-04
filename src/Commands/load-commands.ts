import { SlashCommandBuilder } from "discord.js";
import Command from "../Structures/Command.js";
import * as fs from "fs";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("load-commands")
    .setDescription("Reload Commands"),
  async run(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    // Load chat-input commands
    fs.readdirSync("./js/Commands")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const command = (await import(`../Commands/${file}`)).default;
        client.commands.set(command.data.name, command);
      });

    // Load context menu commands
    fs.readdirSync("./js/ContextMenuCommands")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const command = (await import(`../ContextMenuCommands/${file}`))
          .default;
        client.contextMenuCommands.set(command.data.name, command);
      });

    await client.application.commands.set(
      client.commands.map((command) => command.data.toJSON())
    );

    await interaction.editReply({
      content: `Loaded ${
        client.commands.size + client.contextMenuCommands.size
      } commands`,
    });
  },
});
