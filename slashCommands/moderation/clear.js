const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("clear messages")
        .addIntegerOption(option => option
            .setName("amount")
            .setDescription("enter a amount to clear")
            .setRequired(true)
    ),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.permissions.has(["MANAGE_MESSAGES"])) return interaction.reply({ content: "You don't have the permission(s) to use this command!" });
        const amount = interaction.options.getInteger("amount");
        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: "You must provide an amount that is more than 0 and less that 100 to use this command!", ephemeral: true });
        }
        interaction.channel.bulkDelete(amount)
            .then(() => {
                interaction.reply({ content: `Successfully deleted ${amount} message(s)!` });
                setTimeout(() => interaction.deleteReply(), 5000);
            })
            .catch(() => interaction.reply({ content: "An error occured when executing this command!" }));
    }
}