const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class ArtCommand extends Command {

    static command = "art";

    static cooldownMs = 5000;
    static cooldowns = [];

    static description = "Shows a random piece of art :art:";

    static call(args, data, token) {

        var subreddits = [
            "abstractart", 
            "art", 
            "doodles", 
            "oilpastel", 
            "oilpastels",
            "paintings"
        ]

        var rng = Math.round(Math.random() * (subreddits.length - 1));

        this.getRandomRedditPostJSON(subreddits[rng])

            .then(json => {

                var {title, url, subreddit} = json;
                MessageSender.reply(data.id, `**${title} (from r/${subreddit})**\n${url}`, token, data.channel_id);

            })

    }


}

module.exports = {ArtCommand};
