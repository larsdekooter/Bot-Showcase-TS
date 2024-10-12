import {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ApplicationIntegrationType,
} from "discord.js";
import Command from "../Structures/Command.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluate code")
    .setIntegrationTypes([
      ApplicationIntegrationType.UserInstall,
      ApplicationIntegrationType.GuildInstall,
    ]),
  async run(interaction, client) {
    if (interaction.user.id !== "697045560527552552") return;

    const modal = new ModalBuilder()
      .setCustomId("evalModal")
      .setTitle("Evaluate Code");

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId("codeInput")
        .setLabel("Code")
        .setStyle(TextInputStyle.Paragraph)
    );

    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
});
