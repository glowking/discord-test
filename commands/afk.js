module.exports = {
	name: 'afk',
	description: 'go Afk',
	execute(message, args) {
    message.reply('nobody cares');
    console.log('someone went afk')
	},
};
