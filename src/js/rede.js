var servidorWeb = "localhost"
var servidorWebsocket = "ws://" + servidorWeb + ":8080";
var servidorRest = "http://" + servidorWeb + ":3333";

PubSub.subscribe("init", function(msg, data) {
    console.log("websocket connected");
    startConnectionWebsocket();
});

var ws;

function startConnectionWebsocket() {
    ws = new ReconnectingWebSocket(servidorWebsocket);
    ws.onopen = function(event) {
        ws.send(JSON.stringify({msg : "hello server"}));
    };
    ws.onmessage = function(event) {
        console.log(event);
        console.log(JSON.parse(event.data));

    }
}

PubSub.subscribe("login", function(msg, data) {
    console.log("login");
    ws.send(JSON.stringify({type : "login", data : data}));
})