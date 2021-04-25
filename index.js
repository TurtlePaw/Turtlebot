const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');


//const keyv = new Keyv('sqlite:react.sqlite');
//keyv.on('error', err => console.error('Keyv connection error:', err));
// at the beginning of your code:
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: `Your server! ${config.prefix}help`,
            type: 'WATCHING',
        },
    },
});
const roleName = '2 Month Supporter';


client.once('ready', () => {
    console.log('Ready!');
});

client.commands = new Discord.Collection();
client.config = config;

const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    console.log(`loading cmds/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('message', message => {
    //if(message.content.startsWith(`${prefix}tpwhois`)){
    var Member;
    var status;
    var differentDays = 0;
    if (message.mentions.members) {
        Member = message.mentions.members.first()
        if (!Member) {
            Member = message.member
        }
        status = Member.presence.status
    }

    if (message.content.startsWith(config.prefix) && !message.author.bot) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        try {
            command.execute(message, Member, args);
        } catch (error) {
            console.error(error);
            message.reply("sorry I'm not feeling well - I think it is the pizza from last night");
        }
    }

    if (status == "dnd") {
        var status = "Do not Disturb"
    }
    if (Member) {
        var joinedSince = new Date() - Member.joinedAt
        differentDays = Math.round(joinedSince / (1000 * 3600 * 24));
    }
    if (differentDays >= 60 && Member && !Member.roles.cache.some(role => role.name === roleName)) {
        const role = message.guild.roles.cache.find(role => role.name === roleName);
        Member.roles.add(role);
        const flyEmoji = client.emojis.cache.get('831584687498461274')
        let whoisEmbed = new Discord.MessageEmbed()
            .setTitle(`Hey ${Member.displayName}!`)
            .setColor("AQUA")
            .setDescription(`You are getting the '**Supporter role**' ${flyEmoji}`)
            .addField(`${Member.displayName} joined since`, differentDays)
            //            .addField("Joined at", Member.joinedAt)
            //            .addField("Status", status)
            .setFooter("Turtlebot")
        message.channel.send(whoisEmbed)
    }

    if (message.content === (`${config.prefix}ping`)) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
    if (message.content.toLowerCase().includes(`omg`)) {
        message.react('833491346018271253');
    }
    if (message.content.toLowerCase().includes(`Omg`)) {
        message.react('833491346018271253');
    }
    if (message.content.toLowerCase().includes(`Yay!`)) {
        message.react('831584687498461274');
    }
    if (message.content.toLowerCase().includes(`hi`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`hello`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`hey`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`Hey`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`Good morning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`good morning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`Goodmorning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`goodmorning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content.toLowerCase().includes(`Goodnight everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`goodnight everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`Good night everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`good night everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`Well goodnight everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`Well good night everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`well good night everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`well goodnight everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`well Goodnight everyone`)) {
        message.react('580596349284777984');
    }
    if (message.content.toLowerCase().includes(`well Good night everyone`)) {
        message.react('580596349284777984');
    }



});

client.on('guildMemberAdd', member => { //This is creating an event saying when a member joins the server...

    const channel = member.guild.channels.cache.find(ch => ch.name.includes("welcome")); //** This is telling the script which server to send teh message in**\\
    const serverName = member.guild.name
    if (!channel) return;
    var blob1 = client.emojis.cache.get('835250126087389194')
    channel.send(`Welcome to ${serverName} ${blob1}, please read the <#824406474804953109>, hope you have a pleasant stay ${member}! Say ${config.prefix}verify to begin! ${member}`);
}); // That up ^here^ tells the bot what channel to send the message in!
client.login(config.token);
//client.user.setActivity('-help');