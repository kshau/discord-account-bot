const {MessageSender} = require("../MessageSender");

class Command {

    static command = null;

    static cooldownMs = null;
    static cooldownIds = null;

    static description = null;

    static listen(content, msgId, sender, token, channel_id) {

        if (content.toLowerCase().startsWith(this.command)) {

            if (this.cooldownIds.includes(sender.id)) {
                MessageSender.send(`**That command has a ${this.cooldownMs / 1000} second cooldown!**`, token, channel_id);
            }

            else {

                var args = content.split(" ");

                this.call(args, msgId, sender, token, channel_id).then();
                this.cooldownIds.push(sender.id);

                setTimeout(() => {
                    this.cooldownIds.splice(this.cooldownIds.indexOf(sender.id), 1);
                }, this.cooldownMs)

            }

        }

    }

}

module.exports = {Command};