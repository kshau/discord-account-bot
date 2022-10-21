const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class MemeCommand extends Command {

    static command = "meme";

    static cooldownMs = 5000;
    static cooldowns = [];

    static description = "Shows a random meme :clown:";

    static call(args, data, token) {

        var subreddits = [
            "memes", 
            "wholesomememes", 
            "memeeconomy"
        ]

        var rng = Math.round(Math.random() * (subreddits.length - 1));

        this.getRandomRedditPostJSON(this.subreddits[rng])

            .then(json => {

                var {title, url, subreddit} = json;
                MessageSender.reply(data.id, `**${title} (from r/${subreddit})**\n${url}`, token, data.channel_id);

            })

    }


}

module.exports = {MemeCommand};
