module.exports = {
  name: 'avatar',
execute(message, args) {
		if (args[0]) {
			// Change `getUserFromMention` to `getUserFromMentionRegEx` to try the RegEx variant.
			const user = getUserFromMention(args[0]);

			if (!user) {
				return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
			}

			return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		}

		return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
	}
}
