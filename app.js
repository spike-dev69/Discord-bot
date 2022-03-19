const Discord = require("discord.js");
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
});
const config = require("./config.json");
const { token, prefix } = config.client;
const fs = require("fs");
const { isInteractionButton } = require("discord-api-types/utils/v9");

// slash command handler
client.commands = new Discord.Collection;
const commandFolders = fs.readdirSync("./slashCommands")
    .map(folder => folder);
for (const folder of commandFolders) {
    const files = fs.readdirSync(`./slashCommands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of files) {
        try {
            const command = require(`./slashCommands/${folder}/${file}`);
            client.commands.set(command.data.name, command);
        } catch (error) {
            console.log(error);
        }
    }
}

// event handler
const eventFiles = fs.readdirSync("./events")
    .filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once === true) {
        client.once(event.eventName, (...args) => event.execute(...args));
    } else {
        client.on(event.eventName, (...args) => event.execute(...args));
    }
}


client.login(token);