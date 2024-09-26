import { Client, GatewayIntentBits, Collection } from "discord.js";
import Command from "./Command.js";
import * as fs from "fs";

export default class MyClient extends Client {
  commands: Collection<string, Command>;
  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });
    this.commands = new Collection();
  }

  start(token: string) {
    fs.readdirSync("./js/Commands")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const command = (await import(`../Commands/${file}`)).default;
        this.commands.set(command.data.name, command);
      });

    fs.readdirSync("./js/Events")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const event = (await import(`../Events/${file}`)).default;
        this.on(event.event, event.run.bind(null, this));
      });

    this.login(token);
  }
}
