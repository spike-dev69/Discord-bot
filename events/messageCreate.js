const config = require("../config.json");
module.exports = {
    eventName: "messageCreate",
    once: false,
    async execute(message) {
        if (message.author.bot) return;
        if (message.content.toLowerCase() === config.client.prefix + "ping") {
            message.channel.send({ content: `Pong! My latency is ${message.client.ws.ping}ms` });
        }
    }
}