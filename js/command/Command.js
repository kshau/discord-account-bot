const {MessageSender} = require("../MessageSender");

class Command {

    static command = null;

    static cooldownMs = null;
    static cooldownIds = null;

    static description = null;

    static listen(data, token) {

        if (data.content.toLowerCase().startsWith(this.command)) {

            if (this.cooldownIds.includes(data.author.id)) {
                MessageSender.send(`**That command has a ${this.cooldownMs / 1000} second cooldown!**`, token, data.channel_id);
            }

            else {

                var args = data.content.replace(/ +(?= )/g,'').split(" ");

                this.call(args, data, token).then();
                this.cooldownIds.push(data.author.id);

                setTimeout(() => {
                    this.cooldownIds.splice(this.cooldownIds.indexOf(data.author.id), 1);
                }, this.cooldownMs)

            }

        }

    }

}

module.exports = {Command};