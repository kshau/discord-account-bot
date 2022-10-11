const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const { ArgumentError } = require("./error/ArgumentError");

class RollCommand extends Command {

    static command = "roll";

    static cooldownMs = 3000;
    static cooldownIds = [];

    static description = "Rolls a die :game_die: | __<sides>__";

    static call(args, data, token) {

        if (isNaN(args[0])) {
            throw new ArgumentError("The arguments provided were invalid!");
        }

        var sides = (args[0] == undefined) ? (6) : (args[0]);
        var result = Math.round(Math.random() * (sides - 1)) + 1;
        
        MessageSender.reply(data.id, `**${result}!** :game_die:`, token, data.channel_id);

    }


}

module.exports = {RollCommand};
