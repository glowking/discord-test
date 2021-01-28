module.exports = {

name: 'afk',
	description: 'go Afk',
	permissions: 'KICK_MEMBERS',
  execute(message, args) {
    message.reply('nobody cares');
    console.log('someone went afk')
	},
};