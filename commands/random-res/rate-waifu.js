const { Command } = require('discord.js-commando');

module.exports = class RateWaifuCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rate-waifu',
			aliases: ['waifu'],
			group: 'random-res',
			memberName: 'rate-waifu',
			description: 'Rates your waifu.',
			args: [
				{
					key: 'waifu',
					prompt: 'Who do you want to rate?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { waifu }) {
		return msg.say(`I'd give ${waifu} a ${Math.floor(Math.random() * 10) + 1}/10!`);
	}
};
