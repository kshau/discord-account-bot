const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class QuoteCommand extends Command {

    static command = "!kshquote";

    static cooldownMs = 15000;
    static cooldownIds = [];

    static description = "Tells a random inspirational quote"

    static async call(args, msgId, sender, token, channel_id) {

        var quoteRes = await fetch("https://zenquotes.io/api/random");
        var quoteJSON = await quoteRes.json();

        var {q, a} = quoteJSON[0];
        await MessageSender.reply(msgId, `${q}\n\n**~ ${a}**`, token, channel_id);

        return true;

    }


}

module.exports = {QuoteCommand};
