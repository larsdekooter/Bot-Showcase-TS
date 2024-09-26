import MyClient from "./Client.js";
import { ClientEvents } from "discord.js";

function executeFunction<K extends keyof ClientEvents>(
  client: MyClient,
  ...eventArgs: ClientEvents[K]
) {}

export default class Event<K extends keyof ClientEvents> {
  event: K;
  run: typeof executeFunction<K>;

  constructor(event: K, run: typeof executeFunction<K>) {
    this.event = event;
    this.run = run;
  }
}
