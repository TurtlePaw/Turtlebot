const Discord = require('discord.js');
const color = require('../config2.json').color;
const buttons = require('../interactions');
const emojis = require('../emojis.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        let category = interaction.guild.channels.cache.find(c => c.name == "Tickets" && c.type == "category")
        if (interaction.customId === 'ticket_open') {
            if(!category){
                category = await interaction.guild.channels.create(`Tickets`, { type: 'category',
                    reason: 'Ticket Category',
                    permissionOverwrites: [
                       {
                         id: interaction.guild.roles.everyone,
                         deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL],
                      },
                    ],
                   }).catch(( )=>{ })
            }
            const lModel = require('../models/plugins/logs');
            let v = await lModel.find({ guild: interaction.guild.id });
            if(v){
            v.forEach(c => {
                  if(c.ticket === true){
                        const ch = client.channels.cache.get(`${c.logsch}`)
                        const nembed = new Discord.MessageEmbed()
                        .setAuthor(`${interaction.user.username}`, interaction.user.displayAvatarURL())
                        .setThumbnail(interaction.user.displayAvatarURL())
                        .setTitle(`${require('../emojis.json').ticket} ${interaction.user.tag} Opened a ticket!`)
                        require('../models/plugins/logger').log(ch, 'ticket', nembed)
                  }
            });
          }
            const ch = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                 reason: 'Ticket Channel',
                 parent: category,
                 permissionOverwrites: [
                    {
                      id: interaction.guild.roles.everyone,
                      deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL],
                   },
                   {
                    id: interaction.user.id,
                    allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL],
                 },
                 ],
                }).catch(( )=>{ })
            await interaction.reply({ content: `${require('../emojis.json').check} Created a ticket in ${ch}`, ephemeral: true });
            const embed = new Discord.MessageEmbed()
            .setTitle(`${emojis.ticket} Open a ticket!`)
            .setColor(color)
            .setDescription(`${interaction.user} opened a ticket!`)
            const ticketb = new Discord.MessageActionRow()
            .addComponents(
                await buttons.button('Close Ticket', 3, `ticket_close | ${interaction.user.id}`, emojis.ticketid)
            );
            ch.send({ embeds: [embed], components: [ticketb] }).catch(( )=>{ })
        }
    },
};