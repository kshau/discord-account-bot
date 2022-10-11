const {MessageSender} = require("../MessageSender");
const {Logger} = require("../Logger");
const DotEnv = require("dotenv");

DotEnv.config();

const COMMAND_PREFIX = process.env.COMMAND_PREFIX;

class Command {

    static command = null;

    static cooldownMs = null;
    static cooldownIds = null;

    static description = null;

    static listen(data, token) {

        if (data.content.toLowerCase().replace(COMMAND_PREFIX, "").startsWith(this.command)) {

            if (this.cooldownIds.includes(data.author.id)) {
                MessageSender.send(`**That command has a ${this.cooldownMs / 1000} second cooldown!**`, token, data.channel_id);
            }

            else {

                var args = data.content.replace(/ +(?= )/g,'').split(" ").splice(1);

                this.call(args, data, token).then();
                this.cooldownIds.push(data.author.id);

                Logger.log(`${data.author.username}#${data.author.discriminator} (${data.author.id}) used ${this.command} with args {${args}}.`);

                setTimeout(() => {
                    this.cooldownIds.splice(this.cooldownIds.indexOf(data.author.id), 1);
                }, this.cooldownMs)

            }

        }

    }

}

module.exports = {Command};