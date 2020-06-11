const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config/config.json');
const ip = config.ip
const maxPlayers = '32';
const request = require("request");
const refresh = 10;
// Status
client.on('ready', async () => {
    setInterval(async () => {
            await request(`http://${ip}:30120/info.json`, async (error) => {
                if (error) {
                    cleint.user.setActivity("Wyspa OFF", {
                        type: 'WATCHING',
                    });
                } else {
                    await request(`http://${ip}:30120/players.json`, async (error, response, playerss) => {
                        let players = JSON.parse(playerss);
                        client.user.setActivity(`${players.length}/${maxPlayers} graczy`, {
                            type: 'PLAYING',
                        });
                    });
                }
            });
        }, refresh * 1000);
});
// DNT
client.on('message', message => {
    if (message.channel.id != '697756374947463279') return;
    if (message.author.bot) return;
    const args = message.content;
    try {
        let commandFile = require(`./commands/dnt.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    message.channel.send("Jeżeli to widzisz wyślij ss do ```! limek#6666``` \n```${err}```")
    }
});
//
client.login(config.token);
console.log("Bot started!");