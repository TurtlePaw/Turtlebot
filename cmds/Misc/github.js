const Discord = require('discord.js');

module.exports = {
    name: 'github',
    category: 'Misc',
    description: 'Shows a link to the bots Git hub',
    execute(message, Member, args) {
        const Octocat = message.client.emojis.cache.find(em => em.name === "Octocat");
        message.channel.send(`Here's our github! https://github.com/TurtlePaw/Turtlebot ${Octocat}`);
    },
};