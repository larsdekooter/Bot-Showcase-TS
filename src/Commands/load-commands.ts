import {
  REST,
  Routes,
  SlashCommandBuilder,
  InteractionReplyOptions,
} from "discord.js";
import Command from "../Structures/Command.js";
import * as fs from "fs";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("load-commands")
    .setDescription("Reload Commands"),
  async run(interaction, client) {
    await interaction.deferReply();
    fs.readdirSync("./js/Commands")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const command = (await import(`../Commands/${file}`)).default;
        client.commands.set(command.data.name, command);
      });

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, "950680035411501056"),
      {
        body: client.commands.map((command) => command.data.toJSON()),
      }
    );

    await interaction.editReply({
      content: `Loaded ${client.commands.size} commands`,
      ephemeral: true,
    } as InteractionReplyOptions);
  },
});
