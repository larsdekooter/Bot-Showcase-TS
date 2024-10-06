import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../Structures/Command.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("tic-tac-toe")
    .setDescription("Play tic-tac-toe against someone")
    .addUserOption((option) =>
      option
        .setName("opponent")
        .setDescription("The opponent to play against")
        .setRequired(true)
    ),
  async run(interaction, client) {
    const message = await interaction.reply({
      content: "Starting game....",
      fetchReply: true,
    });
    const thread = await message.startThread({
      name: `Tic-tac-toe: ${interaction.user.displayName} 🟢 against ${
        interaction.options.getUser("opponent", true).displayName
      } ❌`,
    });
    const rows: ActionRowBuilder<ButtonBuilder>[] = [];
    for (let i = 0; i <= 2; i++) {
      const row = new ActionRowBuilder<ButtonBuilder>();
      for (let j = 0; j <= 2; j++) {
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(`tic-tactoe:${i}-${j}`)
            .setEmoji("🟦")
            .setStyle(ButtonStyle.Secondary)
        );
      }
      rows.push(row);
    }
    await thread.send({ components: rows });
    await interaction.editReply({
      content: `Tic-tac-toe: ${
        interaction.user
      } 🟢 against ${interaction.options.getUser("opponent", true)} ❌`,
      allowedMentions: { users: [] },
    });
  },
});
