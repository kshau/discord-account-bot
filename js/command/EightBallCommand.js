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

    static getEightBallText() {

        var eightBallListContent = Fs.readFileSync(Path.resolve(__dirname.replace("\\js\\command", "").replace("/js/command", ""), "./eight_ball_responses.txt")).toString();
        var eightBallList = eightBallListContent.split("\n");

        var text = eightBallList[Math.floor(Math.random() * eightBallList.length)].replace("\r", "");

        return text;

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
            var eightBallText = this.getEightBallText();
            MessageSender.reply(data.id, `**${eightBallText}** :8ball:`, token, data.channel_id);
        }

    }


}

module.exports = {EightBallCommand};
