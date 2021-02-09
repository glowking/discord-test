const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

const { TOKEN, PREFIX, LOCALE } = require("../util/Botbackbone");

//const { TOKEN, PREFIX, } = require("../secret.json");

const client = new Client({ 
    disableMentions: "everyone",
    restTimeOffset: 0
  });
//const { TOKEN, PREFIX, LOCALE } = require("./util/botbackbone");


client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
//client.queue = new Map();
//const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");



/**
 * Client Events
 */
client.on("ready", () => {
    console.log(`${client.user.username} ready!`);
    client.user.setActivity(`You`, { type: "WATCHING" });
  });
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);

  