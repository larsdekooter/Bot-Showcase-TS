import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  RESTPostAPIApplicationCommandsJSONBody,
  JSONEncodable,
} from "discord.js";

import MyClient from "./Client.js";

function executeFunction(
  interaction: ChatInputCommandInteraction,
  client: MyClient
) {}

export default class Command {
  data: JSONEncodable<RESTPostAPIApplicationCommandsJSONBody>;
  run: typeof executeFunction;

  constructor(options: {
    data: JSONEncodable<RESTPostAPIApplicationCommandsJSONBody>;
    run: typeof executeFunction;
  }) {
    this.data = options.data;
    this.run = options.run;
  }
}
