const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");
const { ArgumentError } = require("./error/ArgumentError");
const Fs = require("fs");
const Path = require("path");

class EightBallCommand extends Command {

    static command = "8ball";

    static cooldownMs = 3000;
    static cooldowns = [];

    static description = "Tells a random 8-ball response :8ball: `<question>`";

    static async getEightBallJSON() {

        var eightBallJSON;

        while (eightBallJSON == undefined) {

            var eightBallJSON;

            try {
                var eightBallRes = await fetch("https://AccountCommandAPIs.kshauryacoder.repl.co/8ball");
                eightBallJSON = await eightBallRes.json();
            }
            catch(e) {
                var eightBallRes = await fetch("https://AccountCommandAPIs.kshauryacoder.repl.co/8ball");
                eightBallJSON = await eightBallRes.json();
            }

        }

        return eightBallJSON;

    }

    static call(args, data, token) {

        var question = this.getStitchedArguments(args, 0);

        if (question == undefined) {
            throw new ArgumentError("The arguments provided were invalid!");
        }


        if (!question.endsWith("?")) {
            MessageSender.reply(data.id, "**Questions must end with a `?`!** :x:", token, data.channel_id);
        }

        else {

            this.getEightBallJSON()

                .then(json => {

                    var {text} = json;

                    MessageSender.reply(data.id, `${text} :8ball:`, token, data.channel_id);

                })
        }

    }


}

module.exports = {EightBallCommand};
