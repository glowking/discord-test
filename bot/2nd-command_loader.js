const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN2, PREFIX2, LOCALE } = require("../util/Botbackbone");
const path = require("path");
const i18n = require("i18n");



//const { TOKEN, PREFIX, } = require("../secret.json");

const client2 = new Client({ 
    disableMentions: "everyone",
    restTimeOffset: 0
  });
//const { TOKEN, PREFIX, LOCALE } = require("./util/botbackbone");


client2.login(TOKEN2);
client2.commands = new Collection();
client2.prefix = PREFIX2;
client2.queue = new Map();
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


  i18n.configure({
    locales: ["en"],
    directory: path.join(__dirname, "../locales"),
    defaultLocale: "en",
    objectNotation: true,
    register: global,
  
    logWarnFn: function (msg) {
      console.log("warn", msg);
    },
  
    logErrorFn: function (msg) {
      console.log("error", msg);
    },
  
    missingKeyFn: function (locale, value) {
      return value;
    },
  
    mustacheConfig: {
      tags: ["{{", "}}"],
      disable: false
    }
  });
  
  /**
   * client2 Events
   */
  client2.on("ready", () => {
    console.log(`${client2.user.username} ready!`);
    client2.user.setActivity(`You`, { type: "WATCHING" });
  });
  client2.on("warn", (info) => console.log(info));
  client2.on("error", console.error);
  
  /**
   * Import all commands
   */
  const commandFiles = readdirSync(join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(join(__dirname, "../commands", `${file}`));
    client2.commands.set(command.name, command);
  }
  
  client2.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
  
    const prefixRegex = new RegExp(`^(<@!?${client2.user.id}>|${escapeRegex(PREFIX2)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
  
    const [, matchedPrefix] = message.content.match(prefixRegex);
  
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    const command =
      client2.commands.get(commandName) ||
      client2.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  
    if (!command) return;
  
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }
  
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
  
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          i18n.__mf("common.cooldownMessage", { time: timeLeft.toFixed(1), name: command.name })
        );
      }
    }
  
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply(i18n.__("common.errorCommend")).catch(console.error);
    }
  });
  
  console.log ('success2')
  
  