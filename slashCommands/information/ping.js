const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Sends bot's latency"),
	async execute(interaction) {
		interaction.reply(`Pong! My latency is ${interaction.client.ws.ping}ms`);
	},
};