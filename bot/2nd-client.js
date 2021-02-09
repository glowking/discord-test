const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

const { TOKEN2, PREFIX, LOCALE } = require("../util/Botbackbone");

//const { TOKEN, PREFIX, } = require("../secret.json");

const client2 = new Client({ 
    disableMentions: "everyone",
    restTimeOffset: 0
  });
//const { TOKEN, PREFIX, LOCALE } = require("./util/botbackbone");


client2.login(TOKEN2);
client2.commands = new Collection();
client2.prefix = PREFIX;
//client2.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");



/**
 * client2 Events
 */
client2.on("ready", () => {
    console.log(`${client2.user.username} ready!`);
    client2.user.setActivity(`You`, { type: "WATCHING" });
  });
  client2.on("warn", (info) => console.log(info));
  client2.on("error", console.error);

  