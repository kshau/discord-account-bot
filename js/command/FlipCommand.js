const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

class FlipCommand extends Command {

    static command = "flip";

    static cooldownMs = 3000;
    static cooldownIds = [];

    static description = "Flips a coin :coin:";

    static call(args, data, token) {

        var result = Math.round(Math.random());

        if (result == 0) {
            MessageSender.reply(data.id, "**Heads!** :coin:", token, data.channel_id);
        }

        else {
            MessageSender.reply(data.id, "**Tails!** :coin:", token, data.channel_id);
        }

    }


}

module.exports = {FlipCommand};
