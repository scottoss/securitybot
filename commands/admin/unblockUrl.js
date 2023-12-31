const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

        try {
            if(message.channel.type === "dm") return;

            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You are missing the permission(s) \`ADMINISTRATOR\`.`).catch(e => {});

            if (!args[0]) return message.channel.send(`Please define a URL to unblock.`).then(msg => {
                msg.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => { if (client.config.debugmode) return console.log(e); });

            if (args[1]) return message.channel.send(`A URL cannot have spaces.`).then(msg => {
                msg.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => { if (client.config.debugmode) return console.log(e); });

                    await con.query(`SELECT * FROM urlstopper WHERE message='${args[0]}' AND guildid='${message.guild.id}'`, async (err, row) => {
                        if(err) throw err;
                        if(!row[0]) return message.channel.send(`That URL is not blocked for this guild.`).then(msg => {
                            msg.delete({ timeout: 12000 })
                            message.delete()
                        }).catch(e => { if (client.config.debugmode) return console.log(e); });
                    
                        await con.query(`DELETE FROM urlstopper WHERE guildid='${message.guild.id}' AND message='${args[0]}'`, async (err, row) => {
                            if(err) throw err;
                            const embed = new MessageEmbed()
                            .setColor(client.config.colorhex)
                            .setTitle(`URL Block Removed!`)
                            .setDescription(`**URL:** ${args[0]}\n**Enforced By:** ${message.author.tag}`)
                            .setThumbnail(`${client.user.displayAvatarURL()}`)
                            .setTimestamp()
                            .setFooter(`${client.config.copyright}`)

                            message.channel.send(embed).then(msg => {
                                msg.delete({ timeout: 12000 })
                                message.delete()
                            }).catch(e => { if (client.config.debugmode) return console.log(e); });
                        });
                    });

        } catch (e) {
            console.log(e)
        }
}

exports.info = {
    name: "unblockurl",
    description: "This is a command for the owner of the bot...",
    useAliases: true,
    aliases: ['urlunblock']
}