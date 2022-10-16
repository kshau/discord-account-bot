const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class JokeCommand extends Command {

    static command = "joke";

    static cooldownMs = 5000;
    static cooldowns = [];

    static description = "Tells a random joke :rofl:";

    static async getJokeJSON() {

        var jokeRes = await fetch("https://official-joke-api.appspot.com/random_joke");
        var jokeJSON = await jokeRes.json();

        return jokeJSON;

    }

    static call(args, data, token) {

        this.getJokeJSON()

            .then(json => {

                var {setup, punchline} = json;
                MessageSender.reply(data.id, `${setup}\n||${punchline}||`, token, data.channel_id);

            })

    }


}

module.exports = {JokeCommand};
