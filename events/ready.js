const config = require("../config.json");
module.exports = {
    eventName: "ready",
    once: true,
    async execute(client) {
        await client.user.setPresence({ activities: [{ type: "WATCHING", name: `My prefix is ${config.client.prefix}` }] });
        console.log(`Ready! Loggged in as ${client.user.tag}.`);
    }
}