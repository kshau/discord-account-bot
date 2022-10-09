const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

const {SayCommand} = require("./SayCommand");
const {ShipCommand} = require("./ShipCommand");
const {JokeCommand} = require("./JokeCommand");
const {QuoteCommand} = require("./QuoteCommand");

class HelpCommand extends Command {

    static command = "!kshhelp";

    static cooldownMs = 30000;

    static description = "Shows this!"

    static async call(args, msgId, sender, token, channel_id) {

        const CMDS = [
            HelpCommand,
            SayCommand, 
            ShipCommand, 
            JokeCommand, 
            QuoteCommand
        ]

        var msg = ">>> **:dizzy: kshaurya731 :dizzy:**\n══════════════════";

        CMDS.forEach(c => {
            msg += "\n:arrow_right: __" + c.command + "__ - **" + c.description + "**";
        });

        MessageSender.send(msg, token, channel_id);

        return true;

    }


}

module.exports = {HelpCommand};