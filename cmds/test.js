module.exports = {
    name: 'test',
    description: 'Test',
    execute(message, Member, args) {
        let whoisEmbed = new Discord.MessageEmbed()
            .setTitle(`Testing`)
            .setColor("AQUA")
            //        .setDescription(`<:Myemoji:829858304297271306>`)
            .addField("Is it working?", "<:Myemoji:829858304297271306>")
            .setFooter("Turtlebot :)")
        message.channel.send(whoisEmbed);
    },
};
