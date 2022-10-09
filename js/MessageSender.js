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

    static async reply(refernce, content, token, channel_id) {

        await fetch(`https://discord.com/api/v9/channels/${channel_id}/messages`, {
            "headers": {
                "authorization": token,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                "content": content, 
                "message_reference": {
                    "channel_id": channel_id, 
                    "message_id": refernce
                }
            }),
            "method": "POST",
        });
    }

}

module.exports = {MessageSender};