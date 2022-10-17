const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class InsultCommand extends Command {

    static command = "insult";

    static cooldownMs = 3000;
    static cooldowns = [];

    static description = "Tells a random insult :sob:";

    static async getInsultText() {

        var insultRes = await fetch("https://evilinsult.com/generate_insult.php?type=plain&lang=en&_=1665976803468");
        var insultText = await insultRes.text();

        return insultText;

    }

    static call(args, data, token) {

        this.getInsultText()

            .then(text => {

                MessageSender.reply(data.id, `**${text}** :smiling_imp:`, token, data.channel_id);

            })

    }


}

module.exports = {InsultCommand};
