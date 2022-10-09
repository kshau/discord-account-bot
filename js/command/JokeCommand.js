const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class JokeCommand extends Command {

    static command = "!kshjoke";

    static async call(args, sender, token, channel_id) {

        var jokeRes = await fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        var jokeJSON = await jokeRes.json();

        var {setup, delivery} = jokeJSON;

        await MessageSender.send(setup, token, channel_id);

        setTimeout(() => {
            MessageSender.send(delivery, token, channel_id).then();
        }, 2000)

        return true;

    }


}

module.exports = {JokeCommand};
