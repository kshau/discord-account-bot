const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

class ShipCommand extends Command {

    static command = "!kshship";

    static async call(args, sender, token, channel_id) {

        if (args.length < 3 || args.length > 5) {
            await MessageSender.send("**Invalid arguments!**", token, channel_id);
            return false;
        }

        var id1;
        var id2;

        try {
            id1 = args[1].match(/\d+/)[0];
            id2 = args[2].match(/\d+/)[0];
        }
        catch (TypeError) {
            await MessageSender.send("**Invalid arguments!**", token, channel_id);
            return false;
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

        await MessageSender.send(`**${result}%** ${relation}`, token, channel_id);

        return true;

    }


}

module.exports = {ShipCommand};