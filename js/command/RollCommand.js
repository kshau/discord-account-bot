const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const { ArgumentError } = require("./error/ArgumentError");

class RollCommand extends Command {

    static command = "roll";

    static cooldownMs = 3000;
    static cooldowns = [];

    static description = "Rolls a die :game_die: | __<sides?>__";

    static call(args, data, token) {
        
        var sides = (args[0] == undefined) ? (6) : (args[0]);

        if (sides > 64000000 || sides < 2 || isNaN(sides)) {
            throw new ArgumentError("The arguments provided were invalid!");
        }

        var result = Math.round(Math.random() * (sides - 1)) + 1;
        
        MessageSender.reply(data.id, `**${result.toLocaleString("en-US")}!** :game_die:`, token, data.channel_id);

    }


}

module.exports = {RollCommand};
