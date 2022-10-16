const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class CatCommand extends Command {

    static command = "cat";

    static cooldownMs = 5000;
    static cooldowns = [];

    static description = "Shows a random cat photo :cat:";

    static async getCatJSON() {

        var catRes = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
        var catJSON = await catRes.json();

        return catJSON[0];

    }

    static call(args, data, token) {

        this.getCatJSON()

            .then(json => {

                var {url} = json;
                MessageSender.reply(data.id, url, token, data.channel_id);

            })

    }


}

module.exports = {CatCommand};
