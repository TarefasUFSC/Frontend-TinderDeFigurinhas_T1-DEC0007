

PubSub.subscribe("init", function(msg, data) {
    console.log("init page");
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

PubSub.subscribe("login", async function(msg, data) {
    
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
PubSub.subscribe("get_matches_list", function(msg, id_user) {
    const data = {id_user : id_user};
    $.ajax({
        url: servidorRest + "/user/match",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (dt_r) {
            console.log(dt_r);
            if(dt_r.error){
            console.log("nenhum match");
            }else{
            PubSub.publish("matches_list_response", dt_r);}
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(xhr.responseJSON.error)
        }
    });
});