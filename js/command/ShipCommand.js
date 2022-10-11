const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const { ArgumentError } = require("./error/ArgumentError");

class ShipCommand extends Command {

    static command = "ship";

    static cooldownMs = 3000;
    static cooldownIds = [];

    static description = "Matchmakes two people :heartpulse: | __<mention> <mention>__"

    static call(args, data, token) {

        if (args.length < 2 || args.length > 4) {
            throw new ArgumentError("The arguments provided were invalid!");
        }

        var id1;
        var id2;

        try {
            id1 = args[0].match(/\d+/)[0];
            id2 = args[1].match(/\d+/)[0];
        }
        catch (TypeError) {
            throw new ArgumentError("The arguments provided were invalid!");
        }

        var result = Math.abs(Math.round(Math.cos(id1 + id2) * 100));
        
        var relation;

        if (result > 80) {
            relation = "Amazing! :heart:";
        }
        else if (result > 60) {
            relation = "Good! :+1:";
        }
        else if (result > 40) {
            relation = "Okay :smiley:";
        }
        else if (result > 20) {
            relation = "Bad! :-1:";
        }
        else {
            relation = "Horrible! :broken_heart:";
        }

        MessageSender.reply(data.id, `**${result}%** ${relation}`, token, data.channel_id);

        return true;

    }


}

module.exports = {ShipCommand};