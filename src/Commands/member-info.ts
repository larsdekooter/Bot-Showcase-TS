import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../Structures/Command.js";
import { timestamp } from "../util.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("member-info")
    .setDescription("Get information about a member")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to get info from")
        .setRequired(false)
    ),
  async run(interaction, client) {
    const member = (interaction.options.getMember("member") ||
      interaction.member) as GuildMember;
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
