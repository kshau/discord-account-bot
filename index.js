const WebSocket = require("ws");

const {SayCommand} = require("./js/command/SayCommand");
const {ShipCommand} = require("./js/command/ShipCommand");

const TOKEN = "NzY4MTgxMjc3ODE0Njg1NzA2.Glj2dn.9J7WSQslE6elSa6WSeD1avgO4qcy5w9UiE--ks";

const REGISTERED_CMDS = [
    SayCommand, 
    ShipCommand
]

function connect() {

    var ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
    var interval;

    ws.on("open", () => {

    ws.send(JSON.stringify({
        "op": 2,
        "d": {
        "token": TOKEN,
        "properties": {
            "os": "linux",
            "browser": "chrome"
        }
        }
    }))

    })


    ws.on("message", (data) => {

        var json = JSON.parse(data);

        var {op, t, d} = json;

        if (op == 10) {
        interval = d.heartbeat_interval;
        setInterval(() => {
            ws.send(JSON.stringify({
            op: 1,
            d: null
            }))
        }, interval)
        }

        switch (t) {

            case "MESSAGE_CREATE":
                REGISTERED_CMDS.forEach(c => {
                    c.listen(d.content, d.author, TOKEN, d.channel_id);
                })
                break;

        }
        
    })

    ws.on("close", connect);

}

connect();