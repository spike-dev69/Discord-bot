const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("verify")
        .setDescription("Verify")
        .addStringOption(option => option
            .setName("name")
            .setDescription("Please provide your real name")
            .setRequired(true)
    ),
    async execute(interaction) {
        if (interaction.channel.name !== "verify") return interaction.deferReply();
        const name = interaction.options.getString("name");
        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === "member");
        interaction.member.setNickname(name).then(() => interaction.reply({ content: "Successfully verified!" }));
        interaction.member.roles.add(role);
	},
};