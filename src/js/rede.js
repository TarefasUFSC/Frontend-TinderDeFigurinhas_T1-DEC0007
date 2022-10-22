

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
        rsp = JSON.parse(event.data)
        if(rsp.type == 'login'){
            PubSub.publish("login_response", rsp.data);
        }

    }
}

PubSub.subscribe("login", function(msg, data) {
    console.log("login");
    ws.send(JSON.stringify({type : "login", data : data}));
})
PubSub.subscribe("register", function(msg, data) {
    console.log("register");
    // send a post to api
    $.ajax({
        url: servidorRest + "/user/signup",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            PubSub.publish("register_response", data);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(xhr.responseJSON.error)
        }
    });
    //ws.send(JSON.stringify({type : "login", data : data}));
})