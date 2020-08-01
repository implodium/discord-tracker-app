const admin = require("firebase-admin");
const Discord = require("discord.js")
const client = new Discord.Client();
const serviceAccount = require("./serviceAccountKey.json");
const config = require('./config.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${config.database}.firebaseio.com`
});

const database = admin.database();

client.login(config.token)
    .catch(console.log)

client.on('ready', () => {
    console.log("CONNECTED")
})

function getStats(guild) {
    let onlineCount = 0;
    let offlineCount = 0;

    guild.members.cache.forEach(member => {
        let status = member.presence.status;

        if (status === 'online' || status === 'dnd' || status === 'idle') {
            onlineCount++;
        } else if (status === 'invisible' || status === 'offline') {
            offlineCount++;
        }
    })


    return {
        guildID: guild.id,
        memberCount: guild.memberCount,
        onlineCount: onlineCount,
        offlineCount: offlineCount,
    };
}

function refreshServerStatistic(guild) {
    if (guild === undefined) {

        client.guilds.cache.forEach(guild => {
            let stats = getStats(guild);
            upload(stats)
        })
    } else {
        const stats = getStats(guild);
        upload(stats)
    }
}

function upload(stats) {
    database.ref('guilds/' + stats.guildID).set(stats)
        .catch(console.log)
}

client.on('presenceUpdate', () => refreshServerStatistic())
client.on('guildMemberRemove', member => refreshServerStatistic(member.guild))
client.on('guildMemberAdd', member => refreshServerStatistic(member.guild))

