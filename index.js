const prefix = "-";

require("dotenv").config();
const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "MessageContent"
    ]
});

client.on("ready", () => { console.log(`Logged in as ${client.user.tag}!`); });

// * Command Handler
client.on("messageCreate", (msg) => {
    if (!msg.content.startsWith(prefix)) { return; } // prune messages we cannot have a match with
    
    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === "shutdown" && msg.author.id === process.env.OWNER_ID) { // shutdown the bot
        msg.channel.send("Shutting down").then(() => { client.destroy(); });
        return;
    }

    if (cmd === "help") { // help message
        if (!args[1]) {
            const m = new EmbedBuilder()
                .setColor(0xE10101)
                .setTitle("__List of Commands__")
                .addFields(
                    { name: "-help", value: "Get information on each command." },
                    { name: "-flip", value: "Flip a coin." }
                )
                .setFooter({ text: "For more information on each command use " + prefix + "help [command]" });

            msg.channel.send({ embeds: [m] });
            return;
        }

        switch(args[1]) {
            case "help": {
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xE10101)
                            .setTitle("__Command: " + prefix + "help__")
                            .addFields(
                                { name: "Description: ", value: "Gives details on what a command does." },
                                { name: "Usage: ", value: prefix + "help [command]" }
                            )
                    ]
                });

                return;
            }

            case "flip": {
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xE10101)
                            .setTitle("__Command: " + prefix + "flip__")
                            .addFields(
                                { name: "Description: ", value: "Flip a coin." },
                                { name: "Usage: ", value: prefix + "flip" }
                            )
                    ]
                });

                return;
            }
        }

        msg.channel.send("That command is not recognized. Try using this on an existing command.");
        return;
    }

    if (cmd === "flip") { // coin flip
        let n = Math.floor(Math.random() * 2);
        if (n == 1) {
            msg.channel.send("**Heads**");
            return;
        }

        msg.channel.send("**Tails**");
    }
});

client.login(process.env.TOKEN);
