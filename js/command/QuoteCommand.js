const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class QuoteCommand extends Command {

    static command = "quote";

    static cooldownMs = 15000;
    static cooldowns = [];

    static description = "Tells a random inspirational quote :speech_balloon:"

    static async getQuoteJSON() {

        var quoteRes = await fetch("https://zenquotes.io/api/random");
        var quoteJSON = await quoteRes.json();

        return quoteJSON[0];

    }

    static call(args, data, token) {

        this.getQuoteJSON()

            .then(json => {

                var {q, a} = json;
                MessageSender.reply(data.id, `**${q}**\n\n~ ${a}`, token, data.channel_id);
                
            })

    }


}

module.exports = {QuoteCommand};
