import {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  codeBlock,
  ApplicationIntegrationType,
} from "discord.js";
import Command from "../Structures/Command.js";
import { inspect } from "util";

enum EmbedLimits {
  Title = 256,
  Description = 4096,
  FieldName = 256,
  FieldValue = 1024,
  FooterText = 2048,
  AuthorName = 256,
}

export default new Command({
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluate code")
    .setIntegrationTypes([
      ApplicationIntegrationType.UserInstall,
      ApplicationIntegrationType.UserInstall,
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

    const i = await interaction.awaitModalSubmit({
      filter: (i) => i.customId === "evalModal",
      time: 60000,
    });

    await i.deferReply();
    const code = i.fields.getTextInputValue("codeInput");

    try {
      let evaled: string = await eval(`async function a(){${code};}; a()`);

      if (typeof evaled !== "string") {
        evaled = inspect(evaled);
      }

      if (evaled.length > EmbedLimits.FieldValue) {
        evaled = evaled.substring(0, EmbedLimits.FieldValue - 13) + "...";
      }

      await i.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("#36393e")
            .addFields(
              { name: "Input", value: codeBlock("js", code) },
              { name: "Output", value: codeBlock("js", evaled) }
            )
            .setFooter({
              text: `${client.user.username}`,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });
    } catch (error) {
      console.error(error);
      await i.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `**Input:**\n${codeBlock("js", code)}\n**Output:**\n${codeBlock(
                "ansi",
                `\x1b[31;1m${error.message}`
              )}`
            ),
        ],
      });
    }
  },
});
