import {
  ChannelType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../Structures/Command.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("send-message")
    .setDescription("Send a message to a channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the message to")
        .setRequired(true)
        .addChannelTypes([ChannelType.GuildText])
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send to the channel")
        .setRequired(true)
    ),
  async run(interaction, client) {
    const channel = interaction.options.getChannel<ChannelType.GuildText>(
      "channel",
      true
    );
    const message = interaction.options.getString("message", true);
    await interaction.deferReply({ ephemeral: true });
    const { me } = interaction.guild.members;
    if (
      !channel
        .permissionsFor(me)
        .has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages) //||
      //!channel.permissionsFor(me).has(PermissionFlagsBits.SendMessages)
    )
      return await interaction.editReply({
        content: `I don't have the correct permissions to send messages to ${channel}`,
      });
    await channel
      .send({
        content:
          message + "\n-# Message send by " + interaction.user.toString(),
        allowedMentions: { users: [] },
      })
      .catch((e) => {});

    await interaction.editReply({
      content: `Succesfully send message to ${channel}`,
    });
  },
});
