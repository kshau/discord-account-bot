const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

const API_STACKS_KEY = process.env.API_STACKS_KEY;

class InsultCommand extends Command {

    static command = "insult";

    static cooldownMs = 3000;
    static cooldowns = [];

    static description = "Tells a random insult :sob:";

    static async hasProfanity(text) {

        var encodedText = encodeURIComponent(text);

        if (encodedText == undefined) {
            return false;
        }

        var res = await fetch(`https://api.apistacks.com/v1/filterprofanity?api_key=${API_STACKS_KEY}&text=${encodedText}`);
        var resJSON = await res.json();

        return resJSON.data.profane;

    }

    static async getInsultText() {

        var insultText;

        while (insultText == undefined || (await this.hasProfanity(insultText))) {
            var insultRes = await fetch("https://evilinsult.com/generate_insult.php?type=plain&lang=en&_=1665976803468");
            insultText = await insultRes.text();
        }

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
