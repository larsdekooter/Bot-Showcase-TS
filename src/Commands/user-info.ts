import Command from "../Structures/Command.js";
import { SlashCommandBuilder, GuildMember, EmbedBuilder } from "discord.js";
import { timestamp } from "../util.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Get information about a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get info from")
        .setRequired(false)
    ),
  async run(interaction, client) {
    const user = await (
      interaction.options.getUser("user") || interaction.user
    ).fetch(true);

    const embed = new EmbedBuilder()
      .setColor(user.accentColor)
      .setAuthor({
        name: user.username + "~" + (user.displayName ?? ""),
        iconURL: user.avatarURL(),
      })
      .setThumbnail(user.avatarURL())
      .addFields(
        {
          name: "ID",
          value: user.id,
          inline: true,
        },
        {
          name: "Joined Discord",
          value: `${timestamp(new Date(user.createdTimestamp), "f")}`,
          inline: true,
        },
        {
          name: "Bot",
          value: user.bot ? "Yes" : "No",
          inline: true,
        },
        {
          name: "Flags",
          value: user.flags.toArray().join(", "),
          inline: true,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
});