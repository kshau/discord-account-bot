const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class MemeCommand extends Command {

    static command = "meme";

    static cooldownMs = 5000;
    static cooldowns = [];

    static description = "Shows a random meme :clown:";

    static async getMemeJSON() {

        var memeJSON;

        while (memeJSON == undefined || memeJSON.nsfw == true) {
            var memeRes = await fetch("https://meme-api.herokuapp.com/gimme");
            memeJSON = await memeRes.json();
        }

        return memeJSON;

    }

    static call(args, data, token) {

        this.getMemeJSON()

            .then(json => {

                var {title, url} = json;
                MessageSender.reply(data.id, `**${title}**\n${url}`, token, data.channel_id);

            })

    }


}

module.exports = {MemeCommand};
