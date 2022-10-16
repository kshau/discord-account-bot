const {MessageSender} = require("../MessageSender");
const {Logger} = require("../Logger");

const DotEnv = require("dotenv");
const { ArgumentError } = require("./error/ArgumentError");
const { CooldownError } = require("./error/CooldownError");

DotEnv.config();

const COMMAND_PREFIX = process.env.COMMAND_PREFIX;

class Command {

    static command = null;

    static cooldownMs = null;
    static cooldowns = null;

    static description = null;

    static listen(data, token) {

        if (data.content.toLowerCase().replace(COMMAND_PREFIX, "").startsWith(this.command)) {

            try {

                this.cooldowns.forEach(c => {
                    if (c.userId == data.author.id && c.channelId == data.channel_id) {
                        throw new CooldownError("The command was used when it was still on cooldown!");
                    }
                })

                var args = data.content.replace(/ +(?= )/g,'').split(" ").splice(1);

                this.call(args, data, token);
                this.cooldowns.push({
                    "userId": data.author.id, 
                    "channelId": data.channel_id
                });

                Logger.log(`${data.author.username}#${data.author.discriminator} (${data.author.id}) used $${this.command} with args {${args}} in channel ${data.channel_id}.`);

                setTimeout(() => {
                    this.cooldowns.splice(this.cooldowns.indexOf(data.author.id), 1);
                }, this.cooldownMs)

            }

            catch (err) {

                if (err instanceof ArgumentError) {

                    MessageSender.reply(data.id, "**Invalid arguments!** :x:", token, data.channel_id);

                }

                else if (err instanceof CooldownError) {

                    MessageSender.send(`**That command has a ${this.cooldownMs / 1000} second cooldown!** :watch:`, token, data.channel_id);

                }

                else {
                    Logger.log(err);
                }

            }

        }

    }

    static getStitchedArguments(args) {

        var argsStitched = "";

        for (var i = 0; i <= args.length - 1; i++) {
            argsStitched += args[i];
        }

        if (argsStitched == "") {
            argsStitched = undefined;
        }

        return argsStitched;

    }

}

module.exports = {Command};
