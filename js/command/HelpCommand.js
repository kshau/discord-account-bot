const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

const {SayCommand} = require("./SayCommand");
const {ShipCommand} = require("./ShipCommand");
const {JokeCommand} = require("./JokeCommand");
const {QuoteCommand} = require("./QuoteCommand");
const { FlipCommand } = require("./FlipCommand");
const { RollCommand } = require("./RollCommand");

class HelpCommand extends Command {

    static command = "help";

    static cooldownMs = 30000;
    static cooldownIds = [];

    static description = "Shows this! :smiley:"

    static async call(args, data, token) {

        const CMDS = [
            HelpCommand,
            FlipCommand, 
            RollCommand,
            SayCommand, 
            ShipCommand, 
            JokeCommand, 
            QuoteCommand
        ]

        var msg = ">>> **:dizzy: kshaurya731 :dizzy:**\n══════════════════";

        CMDS.forEach(c => {
            msg += "\n:arrow_right: ** " + "$" + c.command + "** - " + c.description;
        });

        MessageSender.send(msg, token, data.channel_id);

        return true;

    }


}

module.exports = {HelpCommand};