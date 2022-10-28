PubSub.subscribe("init", function(msg, data) {
    console.log("userJS init");
    const user_dt = localStorage.getItem("user_dt");
    if(user_dt) {
        const user = JSON.parse(user_dt);
        console.log(user);
        PubSub.publish("user_logged_startup", user);
    }
    else {
        if(data != "login") {
        PubSub.publish("user_not_logged_startup", null);}
    }	
});
PubSub.subscribe("register_response", function(msg, data) {
    console.log("register_response");
    console.log(data);
    PubSub.publish("to_login", null);
});

PubSub.subscribe("login_response", function(msg, data) {
    console.log("login response receved");
    if(data.error){
        console.log("error");
        alert(data.error);
    }else{
        console.log("success");
        localStorage.setItem("user_dt", JSON.stringify(data));
        PubSub.publish("user_logged_startup", data);
    }
})




