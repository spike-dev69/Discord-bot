const { SlashCommandBuilder } = require('@discordjs/builders');
// const durations = [
//     { name: "60 Seconds", value: 60 * 1000 },
//     { name: "5 Minutes", value: 5 * 60 * 1000 },
//     { name: "10 Minutes", value: 10 * 60 * 1000 },
//     { name: "30 Minutes", value: 30 * 60 * 1000 },
//     { name: "1 Hour", value: 60 * 60 * 1000 },
//     { name: "1 Day", value: 24 * 60 * 60 * 1000 },
//     { name: "1 Week", value: 7 * 24 * 60 * 60 * 1000 }
// ];
// const durationNames = durations.map((i) => i.name);
// const durationValues = durations.map(i => i.value);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("timeout")
        .setDescription("Timeout a member")
        .addUserOption(option => option
            .setName("member")
            .setDescription("Choose a member to timeout")
            .setRequired(true)
    )
        .addIntegerOption(option => option
            .setName("duration")
            .setDescription("Select a duration to timeout")
            .addChoice("60 seconds", 60 * 1000)
            .addChoice("5 minutes", 5 * 60 * 1000)
            .addChoice("30 minutes", 30 * 60 * 1000)
            .addChoice("1 hour", 60 * 60 * 1000)
            .addChoice("1 day", 24 * 60 * 60 * 1000)
            .addChoice("1 week", 7 * 24 * 60 * 60 * 1000)
            .setRequired(true)
    )
        .addStringOption(option => option
            .setName("reason")
            .setDescription("Provide a reason")
            .setRequired(false)
    ),
	async execute(interaction) {
        const member = interaction.options.getMember("member");
        const duration = interaction.options.getInteger("duration");
        const reason = interaction.options.getString("reason") || "No reason provided";
        if (!interaction.member.permissions.has(["MODERATE_MEMBERS"])) return interaction.reply({ content: "You don't have the permission(s) to use this command!" });
        member.timeout(duration, reason)
            .then(() => interaction.reply({ content: `Successfully timeouted ${member}!` }))
            .catch(() => interaction.reply({ content: "Oops, an error occured when executing this command. Try again later.", ephemeral: true }));
	},
};