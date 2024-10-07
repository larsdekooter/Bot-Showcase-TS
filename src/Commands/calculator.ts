import {
  ActionRowBuilder,
  ApplicationIntegrationType,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../Structures/Command.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("calculator")
    .setDescription("Request a calculator")
    .setIntegrationTypes(ApplicationIntegrationType.UserInstall),
  async run(interaction, client) {
    const rows = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("calc-clear")
          .setLabel("Clear")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("calc-(")
          .setLabel("(")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("calc-)")
          .setLabel(")")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("calc-^")
          .setLabel("^")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("calc-delmsg")
          .setLabel("Delete Calculator")
          .setStyle(ButtonStyle.Danger)
      ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("calc-7")
          .setLabel("7")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-8")
          .setLabel("8")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-9")
          .setLabel("9")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-/")
          .setLabel("/")
          .setStyle(ButtonStyle.Primary)
      ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("calc-4")
          .setLabel("4")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-5")
          .setLabel("5")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-6")
          .setLabel("6")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-*")
          .setLabel("*")
          .setStyle(ButtonStyle.Primary)
      ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("calc-1")
          .setLabel("1")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-2")
          .setLabel("2")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-3")
          .setLabel("3")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc--")
          .setLabel("-")
          .setStyle(ButtonStyle.Primary)
      ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("calc-0")
          .setLabel("0")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-.")
          .setLabel(".")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("calc-=")
          .setLabel("=")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("calc-+")
          .setLabel("+")
          .setStyle(ButtonStyle.Primary)
      ),
    ];

    await interaction.reply({ components: rows });
  },
});
