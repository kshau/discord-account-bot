const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class DogCommand extends Command {

    static command = "dog";

    static cooldownMs = 5000;
    static cooldownIds = [];

    static description = "Shows a random dog photo :dog:";

    static async getDogJSON() {

        var dogRes = await fetch("https://dog.ceo/api/breeds/image/random");
        var dogJSON = await dogRes.json();

        return dogJSON;

    }

    static call(args, data, token) {

        this.getDogJSON()

            .then(json => {

                var {message} = json;
                MessageSender.reply(data.id, message, token, data.channel_id);

            })

    }


}

module.exports = {DogCommand};
