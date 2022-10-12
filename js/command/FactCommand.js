const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

const EnvVariables = require("../EnvVariables");

const NINJAS_API_KEY = process.env.NINJAS_API_KEY;

class FactCommand extends Command {

    static command = "fact";

    static cooldownMs = 5000;
    static cooldownIds = [];

    static description = "Tells a random fun fact :astonished:";

    static async getFactJSON() {

        var factRes = await fetch("https://api.api-ninjas.com/v1/facts?limit=3", {
            "headers": {
                "X-Api-Key": NINJAS_API_KEY
            }
        });

        var factJSON = await factRes.json();

        return factJSON[0];

    }

    static call(args, data, token) {

        this.getFactJSON()

            .then(json => {

                var {fact} = json;
                MessageSender.reply(data.id, `Did you know? **${fact}! :astonished:**`, token, data.channel_id);

            })

    }


}

module.exports = {FactCommand};
