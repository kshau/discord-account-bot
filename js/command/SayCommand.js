const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const { ArgumentError } = require("./error/ArgumentError");

class SayCommand extends Command {

    static command = "say";

    static cooldownMs = 10000;
    static cooldowns = [];

    static description = "Quotes something someone said :lips: `<text>`"

    static call(args, data, token) {

        if (args.length < 1) {
            throw new ArgumentError("The arguments provided were invalid!");
        }

        var msg = "";
        for (var i = 0; i <= args.length - 1; i++) {
            msg += args[i];
            if (i != args.length - 1) {
                msg += " ";
            }
        }

        MessageSender.send(`**"${msg}"** ~ ${data.author.username}#${data.author.discriminator}`, token, data.channel_id);

    }


}

module.exports = {SayCommand};
