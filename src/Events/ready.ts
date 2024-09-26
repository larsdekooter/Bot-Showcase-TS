import Event from "../Structures/Event.js";
import { ChannelType } from "discord.js";

export default new Event("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}`);

  // Send a start-up message to the specified channel
  const channel = client.channels.cache.get("950680837211435019");
  if (channel && channel.type === ChannelType.GuildText) {
    const today = new Date();
    channel.send(`Started on <t:${Math.floor(today.getTime() / 1000)}:T>`);
  }
});
