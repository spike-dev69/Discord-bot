const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hack")
        .setDescription("Hack someone (~￣▽￣)~")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Choose someone to hack")
            .setRequired(true)
    ),
    async execute(interaction) {
        const target = interaction.options.getUser("user");
        if (target.id === interaction.client.user.id) return interaction.reply({ content: "You cannot hack me!" });
        interaction.reply({ content: `Hacking ${target}...` });
        setTimeout(() => interaction.editReply({ content: `Inserting viruses to ${target.tag}'s Discord Account...` }), 3000);
        setTimeout(() => interaction.editReply({ content: `Completed! Getting data from server...` }), 6000);
        setTimeout(() => interaction.editReply({ content: `Getting account authorization...` }), 9000);
        setTimeout(() => interaction.editReply({ content: `Hacked ${target} sucessfully!` }), 12000);
    } 
}