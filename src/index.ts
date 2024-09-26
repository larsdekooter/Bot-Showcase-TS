import * as dotenv from "dotenv";
import MyClient from "./Structures/Client.js";

dotenv.config();

const client = new MyClient();

client.start(process.env.DISCORD_TOKEN);
