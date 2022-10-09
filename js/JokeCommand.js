const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class JokeCommand extends Command {

    static command = "!kshjoke";

    static async call(args, msgId, sender, token, channel_id) {

        var jokeRes = await fetch("https://official-joke-api.appspot.com/random_joke");
        var jokeJSON = await jokeRes.json();

        var {setup, punchline} = jokeJSON;
        await MessageSender.reply(msgId, `${setup}\n||${punchline}||`, token, channel_id);

        return true;

    }


}

module.exports = {JokeCommand};
