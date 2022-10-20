const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class FoodCommand extends Command {

    static command = "food";

    static cooldownMs = 5000;
    static cooldowns = [];

    static description = "Shows a random food picture :drool:";

    static async getFoodJSON() {

        var foodJSON;

        while (foodJSON == undefined || foodJSON.memes[0].nsfw == true) {
            var foodRes = await fetch("https://meme-api.herokuapp.com/gimme/food/1");
            foodJSON = await foodRes.json();
        }

        return foodJSON.memes[0];

    }

    static call(args, data, token) {

        this.getFoodJSON()

            .then(json => {

                var {title, url} = json;
                MessageSender.reply(data.id, `**${title}**\n${url}`, token, data.channel_id);

            })

    }


}

module.exports = {FoodCommand};
