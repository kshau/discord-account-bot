const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class JokeCommand extends Command {

    static command = "joke";

    static cooldownMs = 5000;
    static cooldownIds = [];

    static description = "Tells a random joke :rofl:";

    static async call(args, data, token) {

        var jokeRes = await fetch("https://official-joke-api.appspot.com/random_joke");
        var jokeJSON = await jokeRes.json();

        var {setup, punchline} = jokeJSON;
        await MessageSender.reply(data.id, `${setup}\n||${punchline}||`, token, data.channel_id);

        return true;

    }


}

module.exports = {JokeCommand};
