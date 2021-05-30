const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            interaction.reply(`You don't have permissions`)
        }
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
        const member = interaction.options[0].member;
        const reason = interaction.options[1].value;
        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`Banned ${member.user.tag}`)
        .setDescription(`${member.user.tag} Can't come back!`)
        //interaction.guild.members.ban(member);
        member.ban({reason: `${reason}`});
        await interaction.reply(avatarembed);
        }
    }
}