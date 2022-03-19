const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("./config.json"); 
const { clientId, guildId } = config.data;
const { token } = config.client;
const fs = require("fs");
// const commands = [];
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	commands.push(command.data.toJSON());
// }
const commands = [];
const commandFolders = fs.readdirSync("./slashCommands")
    .map(folder => folder);
for (const folder of commandFolders) {
    const files = fs.readdirSync(`./slashCommands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of files) {
        const command = require(`./slashCommands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '9' }).setToken(token);

// Register slash command to local guild
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
    .catch((error) => console.log(error));
    
    // // Register global command
    // (async () => {
    //     try {
    //         console.log('Started refreshing application (/) commands.');
    
    //         await rest.put(
    //             Routes.applicationCommands(clientId),
    //             { body: commands },
    //         );
    
    //         console.log('Successfully reloaded application (/) commands.');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // })();