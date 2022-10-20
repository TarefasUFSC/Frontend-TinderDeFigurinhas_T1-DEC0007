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