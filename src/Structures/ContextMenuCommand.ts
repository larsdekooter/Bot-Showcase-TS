import {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";
import MyClient from "./Client.js";

function runFunction(
  interaction: ContextMenuCommandInteraction,
  client: MyClient
) {}

export default class ContextMenuCommand {
  data: ContextMenuCommandBuilder;
  run: typeof runFunction;
  constructor(options: {
    data: ContextMenuCommandBuilder;
    run: typeof runFunction;
  }) {
    this.data = options.data;
    this.run = options.run;
  }
}
