import Command from "../Structures/Command.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("bot-info")
    .setDescription("Get information about the bot"),
  async run(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Bot Information")
      .setColor("Blue")
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        {
          name: "Bot Name",
          value: `\`${client.user.displayName}\``,
          inline: true,
        },
        { name: "Bot ID", value: `\`${client.user.id}\``, inline: true },
        {
          name: "Bot created at",
          value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:f>`,
          inline: true,
        },
        {
          name: "Servers",
          value: `\`${client.guilds.cache.size}\``,
          inline: true,
        },
        {
          name: "Users",
          value: `\`${client.users.cache.size}\``,
          inline: true,
        },
        {
          name: "Commands",
          value: `\`${client.commands.size}\``,
          inline: true,
        },
        { name: "Ping", value: `\`${client.ws.ping}ms\``, inline: true },
        {
          name: "Uptime",
          value: `<t:${Math.floor(client.readyTimestamp / 1000)}:R>`,
          inline: true,
        },
        { name: "Node.js", value: `\`${process.version}\``, inline: true },
        { name: "OS", value: `\`${process.platform}\``, inline: true },
        {
          name: "CPU",
          value: `\`${process.arch}\``,
          inline: true,
        },
        {
          name: "Memory",
          value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} MB\``,
          inline: true,
        },

        {
          name: "Node.js Version",
          value: `\`${process.version}\``,
          inline: true,
        },
        { name: "OS", value: `\`${process.platform}\``, inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
        { name: "Guild", value: "\u200b", inline: true },
        {
          name: "Guilds",
          value: `\`${client.guilds.cache.size}\``,
          //   inline: true,
        },
        {
          name: `Joined *${interaction.guild.name}* at`,
          value: `<t:${Math.floor(
            interaction.guild.joinedTimestamp / 1000
          )}:f>`,
          inline: true,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
});
