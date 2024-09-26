import { SlashCommandBuilder } from "discord.js";
import Command from "../Structures/Command.js";

const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Clear messages from the channel")
  .addIntegerOption((option) =>
    option.setName("amount").setDescription("Amount of messages to clear")
  );

export default new Command({
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear messages from the channel")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clear")
        .setRequired(false)
    ),
  async run(interaction, client) {
    const amount = interaction.options.getInteger("amount") || 100;

    if (amount > 100) {
      return await interaction.reply({
        content: "You can't clear more than 100 messages",
        ephemeral: true,
      });
    }

    const messages = (
      await interaction.channel.messages.fetch({
        limit: amount,
      })
    ).filter((m) => m.bulkDeletable);

    await interaction.channel.bulkDelete(messages);

    await interaction.reply({
      content: `Cleared ${messages.size} messages`,
      ephemeral: true,
    });
  },
});
