import { TimestampStylesString } from "discord.js";

export function timestamp(date: Date, format: TimestampStylesString) {
  return `<t:${Math.floor(date.getTime() / 1000)}:${format}>`;
}
