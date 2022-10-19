const WebSocket = require("ws");

const DotEnv = require("dotenv");
DotEnv.config();

const {SayCommand} = require("./js/command/SayCommand");
const {ShipCommand} = require("./js/command/ShipCommand");
const {JokeCommand} = require("./js/command/JokeCommand");
const {QuoteCommand} = require("./js/command/QuoteCommand");
const { HelpCommand } = require("./js/command/HelpCommand");
const { FlipCommand } = require("./js/command/FlipCommand");
const { RollCommand } = require("./js/command/RollCommand");
const { FactCommand } = require("./js/command/FactCommand");
const { DogCommand } = require("./js/command/DogCommand");
const { CatCommand } = require("./js/command/CatCommand");
const { CovidCommand } = require("./js/command/CovidCommand");
const { MemeCommand } = require("./js/command/MemeCommand");

const TOKEN = process.env.TOKEN;
const COMMAND_PREFIX = process.env.COMMAND_PREFIX;

const REGISTERED_CMDS = [
    CatCommand, 
    CovidCommand, 
    DogCommand, 
    FactCommand,
    FlipCommand, 
    HelpCommand,
    RollCommand, 
    SayCommand, 
    ShipCommand, 
    JokeCommand, 
    MemeCommand, 
    QuoteCommand
]

function wsConnect() {

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

                if (d.content.startsWith(COMMAND_PREFIX)) {

                    REGISTERED_CMDS.forEach(c => {
                        c.listen(d, TOKEN);
                    })

                }

                break;

        }
        
    })

    ws.on("close", wsConnect);

}

wsConnect();