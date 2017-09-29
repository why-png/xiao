const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { FLICKR_KEY } = process.env;

module.exports = class FlickrCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'flickr',
			aliases: ['flickr-image'],
			group: 'search',
			memberName: 'flickr',
			description: 'Searches Flickr for your query.',
			args: [
				{
					key: 'query',
					prompt: 'What photo would you like to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
			const { body } = await snekfetch
				.get('https://api.flickr.com/services/rest/')
				.query({
					api_key: FLICKR_KEY,
					format: 'json',
					method: 'flickr.photos.search',
					text: query,
					nojsoncallback: true
				});
			if (!body.photos.photo.length) return msg.say('Could not find any results.');
			const data = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
			return msg.say(`https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`);
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
