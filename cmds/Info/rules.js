const Discord = require('discord.js');

module.exports = {
    name: 'rules',
    category: 'Info',
    description: 'TURTLEPAWS SERVER ONLY',
    async execute(message, Member, args) {
        if(message.author.id !== '820465204411236362') { 
            message.author.send(`You don't have permissions!`)
            return message.delete();
        }
        const channel = message.client.channels.cache.get('824406474804953109');
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        const icon = 'https://cdn.discordapp.com/icons/824365717573992480/b251af56c4d6c5d4f6ec8be0cc040bb1.png?size=4096'
        const ver = message.client.emojis.cache.find(em => em.name === "verify");
        const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
        const blobpar = message.client.emojis.cache.find(em => em.name === "Party_blob");
        const blobwa = message.client.emojis.cache.get('585649906677710851')
        const blobwave = message.client.emojis.cache.find(em => em.name === "ablobwave");
        const serverName = Member.guild.name
        const rules = new Discord.MessageEmbed()
        .setTitle(`Welcome to ${serverName}`)
        .setColor(`RED`)
        .setDescription(`The rules are:`)
        .addField(`Rule 1`, `No NSFW or NSFL`)
        .addField(`Rule 2`, `No overruling the admins or owner`)
        .addField(`Rule 3`, `Please respect the admins and the owners`)
        .addField(`Rule 4`, `No arguing`)
        .addField(`Rule 5`, `No spam if you want to spam do it in <#836292487936606258>`)
        .addField(`Rule 6:`, `Follow Discords ToS`)
        .setFooter(`Have fun!`, blobpar.url)
        // await webhook.send({
        //     username: 'A Turtle',
        //     avatarURL: 'https://cdn.discordapp.com/emojis/635256471675994132.gif?v=1',
        //     embeds: [rules],
        // });
    },
}; 