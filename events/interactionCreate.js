module.exports = {
    eventName: "interactionCreate",
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            command.execute(interaction);
        } catch (error) {
            console.log(error);
            interaction.reply({ content: "An error occured when executing this command!", ephemeral: true });
        }
    }
}