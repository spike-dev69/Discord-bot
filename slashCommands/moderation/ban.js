const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
        .setDescription("ban a member")
        .addUserOption(option => option
            .setName("member")
            .setDescription("Select a member to ban")
            .setRequired(true)
    )
        .addStringOption(option => option
            .setName("reason")
            .setDescription("Provide a reason")
            .setRequired(true)
    ),
	async execute(interaction) {
        const member = interaction.options.getMember("member");
        const reason = interaction.options.getString("reason");
        if (!interaction.member.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS"])) return interaction.reply({ content: "You don't have the permission(s) to use this command!", ephemeral: true });
        member.kick(`${reason}, banned by ${interaction.user.tag}`)
            .then(() => interaction.reply({ content: `Banned ${member} successfully!` }));
	},
};