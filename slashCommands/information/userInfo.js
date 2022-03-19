const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Sends the user's information")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Select a user")
            .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const member = interaction.options.getMember("user");
        const data = await user.fetch(true);
        const accentColor = data.hexAccentColor || "GREEN";
        const roles = member.roles.cache;
        const embed = new MessageEmbed()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
            .addFields(
                { name: "Created At", value: moment(user.createdAt, "DD-MM-YYYY").toString(), inline: true },
                { name: "Joined At", value: moment(member.joinedAt, "DD-MM-YYYY").toString(), inline: true }
            )
            .setColor(accentColor);
        
        interaction.reply({ embeds: [embed] });
        console.log(roles);
    }
}