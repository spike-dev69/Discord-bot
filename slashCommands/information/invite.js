const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Sends thee bot's invite link"),
	async execute(interaction) {
        interaction.reply({ content: interaction.client.generateInvite({ scopes: ["bot", "applications.commands"], permissions: "ADMINISTRATOR" }) });
	},
};