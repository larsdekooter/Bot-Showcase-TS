import {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
} from "discord.js";
import Command from "../Structures/Command.js";
import { inspect } from "util";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluate code"),
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
      let evaled = await eval(code);

      if (typeof evaled !== "string") {
        evaled = inspect(evaled);
      }

      await i.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("#36393e")
            .addFields(
              { name: "Input", value: `\`\`\`js\n${code}\n\`\`\`` },
              { name: "Output", value: `\`\`\`js\n${evaled}\n\`\`\`` }
            )
            .setFooter({
              text: `${client.user.username}`,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });
    } catch (error) {
      console.log(error);
      await i.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `**Input:**\n\`\`\`js\n${code}\n\`\`\`\n**Output:**\n\`\`\`ansi\n\x1b[31;1m${error.message}\n\`\`\``
            ),
        ],
      });
    }
  },
});
