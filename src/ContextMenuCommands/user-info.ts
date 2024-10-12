import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  time,
} from "discord.js";
import ContextMenuCommand from "../Structures/ContextMenuCommand.js";

export default new ContextMenuCommand({
  data: new ContextMenuCommandBuilder()
    .setName("User Info")
    .setType(ApplicationCommandType.User),
  async run(interaction, client) {
    if (!interaction.isUserContextMenuCommand()) return;
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
          value: `${time(new Date(user.createdTimestamp), "f")}`,
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
