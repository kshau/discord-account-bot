const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

class SayCommand extends Command {

    static command = "!kshsay";

    static async call(args, sender, token, channel_id) {

        if (args.length < 2) {
            await MessageSender.send("**Invalid arguments!**", token, channel_id);
            return false;
        }

        var msg = "";
        for (var i = 1; i <= args.length - 1; i++) {
            msg += args[i];
            if (i != args.length - 1) {
                msg += " ";
            }
        }

        await MessageSender.send(`"${msg}" **~ ${sender.username}#${sender.discriminator}**`, token, channel_id);

        return true;

    }


}

module.exports = {SayCommand};
