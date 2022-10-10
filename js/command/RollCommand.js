const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

class RollCommand extends Command {

    static command = "!kshroll";

    static cooldownMs = 3000;
    static cooldownIds = [];

    static description = "Rolls a die :game_die: | __<sides>__";

    static async call(args, data, token) {

        var sides = (args[0] == undefined) ? (6) : (args[0]);
        var result = Math.round(Math.random() * (sides - 1)) + 1;
        
        MessageSender.reply(data.id, `**${result}!** :game_die:`, token, data.channel_id);

        return true;

    }


}

module.exports = {RollCommand};
