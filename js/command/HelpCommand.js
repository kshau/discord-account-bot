const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

const {SayCommand} = require("./SayCommand");
const {ShipCommand} = require("./ShipCommand");
const {JokeCommand} = require("./JokeCommand");
const {QuoteCommand} = require("./QuoteCommand");
const { FlipCommand } = require("./FlipCommand");
const { RollCommand } = require("./RollCommand");
const { FactCommand } = require("./FactCommand");
const { DogCommand } = require("./DogCommand");
const { CatCommand } = require("./CatCommand");
const { CovidCommand } = require("./CovidCommand");
const { MemeCommand } = require("./MemeCommand");
const { InsultCommand } = require("./InsultCommand");

class HelpCommand extends Command {

    static command = "help";

    static cooldownMs = 30000;
    static cooldowns = [];

    static description = "Shows this! :smiley:"

    static call(args, data, token) {

        const CMDS = [
            HelpCommand,
            CatCommand, 
            CovidCommand, 
            DogCommand, 
            FactCommand,
            FlipCommand, 
            InsultCommand, 
            RollCommand,
            SayCommand, 
            ShipCommand, 
            JokeCommand, 
            MemeCommand, 
            QuoteCommand
        ]

        var msg = ">>> **:dizzy: kshaurya731 :dizzy:**\n══════════════════";

        CMDS.forEach(c => {
            msg += "\n:arrow_right: ** " + "$" + c.command + "** - " + c.description;
        });

        MessageSender.send(msg, token, data.channel_id);

    }


}

module.exports = {HelpCommand};