const Discord = require('discord.js');

module.exports = {
    name: 'register',
    description: 'DEV ONLY',
    async execute(message, Member, args) {
        const client = message.client
        if (!client.application?.owner) await client.application?.fetch();
//https://discord.com/oauth2/authorize?client_id=841782635386109972&scope=bot+applications.commands
        const data = {
            name: 'suggest',
            description: 'Sends a suggestion to my developer',
            options: [{
				name: 'suggestion',
				type: 'STRING',
				description: 'The suggestion you want to send to my developers',
				required: true,
			}],
        };

        const command = await client.guilds.cache.get('834199640702320650')?.commands.create(data);
        console.log(command);
    }
}
//const command = await client.application?.commands.create(data);
//const command = await client.guilds.cache.get('834199640702320650')?.commands.create(data);