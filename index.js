require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "MessageContent"
    ]
});

client.on("ready", () => { console.log(`Logged in as ${client.user.tag}!`); });
client.on("messageCreate", (msg) => { if (msg.content === "hello") { msg.channel.send("Hello World"); } });

client.login(process.env.CLIENT_TOKEN);
