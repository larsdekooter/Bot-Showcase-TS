import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import ContextMenuCommand from "../Structures/ContextMenuCommand.js";
import { EmbedBuilder } from "@discordjs/builders";
import { timestamp } from "../util.js";

export default new ContextMenuCommand({
  data: new ContextMenuCommandBuilder()
    .setName("Member Info")
    .setType(ApplicationCommandType.User),
  async run(interaction, client) {
    if (!interaction.isUserContextMenuCommand()) return;
    const member = await interaction.guild.members.fetch(
      interaction.options.getUser("user").id
    );

    const user = await member.user.fetch(true);

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
          name: "Joined server at",
          value: timestamp(new Date(member.joinedAt), "f"),
          inline: true,
        },
        {
          name: "Muted",
          value: member.isCommunicationDisabled() ? "True" : "False",
          inline: false,
        },
        {
          name: "Roles",
          value: member.roles.cache.map((r) => r.name).join(", "),
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
});
