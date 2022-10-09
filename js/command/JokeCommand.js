const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class JokeCommand extends Command {

    static command = "!kshjoke";

    static async call(args, msgId, sender, token, channel_id) {

        var jokeRes = await fetch("https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        var jokeJSON = await jokeRes.json();

        if (jokeJSON.setup == undefined) {
            var {joke} = jokeJSON;
            await MessageSender.reply(msgId, joke, token, channel_id);
        }

        else {

            var {setup, delivery} = jokeJSON;
            await MessageSender.reply(msgId, `${setup}\n||${delivery}||`, token, channel_id);

        }

        return true;

    }


}

module.exports = {JokeCommand};
