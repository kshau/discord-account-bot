const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class WouldYouRatherCommand extends Command {

    static command = "wouldyourather";

    static cooldownMs = 3000;
    static cooldowns = [];

    static description = "Asks a random would-you-rather question :thinking:";

    static async getWYRJSON() {

        var WYRJSON;

        while (WYRJSON == undefined || WYRJSON.text.split(" or ").length != 2) {

            var WYRRes;
            var WYRJSON;

            try {
                WYRRes = await fetch("https://wouldyouratherapi.kshauryacoder.repl.co/api");
                WYRJSON = await WYRRes.json();
            }
            catch(e) {
                WYRRes = await fetch("https://wouldyouratherapi.kshauryacoder.repl.co/api");
                WYRJSON = await WYRRes.json();
            }

        }

        return WYRJSON;

    }

    static call(args, data, token) {

        this.getWYRJSON()

            .then(json => {

                var {text} = json;

                var choice1 = this.capitalizeFirstLetter(text.split(" or ")[0].replace("Would you rather ", ""));
                var choice2 = this.capitalizeFirstLetter(text.split(" or ")[1]).replace("?", "");

                MessageSender.reply(data.id, `**Would You Rather**\n:a: ${choice1}\n:b: ${choice2}`, token, data.channel_id);

            })

    }


}

module.exports = {WouldYouRatherCommand};
