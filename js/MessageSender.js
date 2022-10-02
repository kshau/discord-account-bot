const {fetch} = require("undici");

class MessageSender {

    static async send(content, token, channel_id) {

        await fetch(`https://discord.com/api/v9/channels/${channel_id}/messages`, {
            "headers": {
                "authorization": token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({"content": content}),
            "method": "POST",
        });

    }

}

module.exports = {MessageSender};