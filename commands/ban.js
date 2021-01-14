module.exports = {
  name: 'ban',
  permissions: 'BAN_MEMBERS',

  run: async (bot, message, args) => {

        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

        const user1 = message.mentions.users.first();
        var member = message.mentions.members.first()


        if (member) {

            const member = message.mentions.members.first()

            let reason = args.slice(2).join(' '); // arguments should already be defined
            var user = message.mentions.users.first();

            member.ban({ reason: `${args.slice(2).join(' ')}` }).then(() => {
                let uEmbed = new RichEmbed()
                    .setTitle('**' + `Sucessfully Banned ${user1.tag}!` + '**')
                    .setThumbnail('https://i.gyazo.com/8988806671312f358509cf0fd69341006.jpg')
                    .setImage('https://media3.giphy.com/media/H99r2HtnYs492/giphy.gif?cid=ecf05e47db8ad81dd0dbb6b132bb551add0955f9b92ba021&rid=giphy.gif')
                    .setColor(0x320b52)
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.tag, 'https://i.gyazo.com/8988806671312f358509cf0fd69341006.jpg')
                message.channel.send(uEmbed);

            }).catch(err => {
                message.channel.send('I was unable to kick the member');
                console.log(err);
            });
        } else {
            let user = message.mentions.users.first(),
                userID = user ? user.id : args[1]

            if (isNaN(args[1])) return message.channel.send("You need to enter a vlaid @Member or UserID #");

            if (args[1].length <= 17 || args[1].length >= 19) return message.channel.send("UserID # must be 18 Digits");

            if (userID) {
                let bannedIDs = require('./bannedIDs.json').ids || []

                if (!bannedIDs.includes(userID)) bannedIDs.push(userID)

                fs.writeFileSync('./bannedIDs.json', JSON.stringify({ ids: bannedIDs }))
                let reason = args.slice(2).join(' ');
                let uEmbed = new RichEmbed()
                    .setTitle('**' + `UserID #${args[1]}\n Will be Banned on Return!` + '**')
                    .setThumbnail('https://i.gyazo.com/8988806671312f358509cf0fd69341006.jpg')
                    .setImage('https://i.imgur.com/6Sh8csf.gif')
                    .setColor(0x320b52)
                    .setTimestamp()
                    .setFooter('Requested by ' + message.author.tag, 'https://i.gyazo.com/8988806671312f358509cf0fd69341006.jpg')
                    message.channel.send(uEmbed);

            } else {
                message.channel.send('Error')
            }
        }
    }

}
