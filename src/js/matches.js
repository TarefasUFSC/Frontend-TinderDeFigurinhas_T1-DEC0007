PubSub.subscribe("matches_init",function(msg,data){
    console.log("matches init");
    
    const user_dt = localStorage.getItem("user_dt");
    const user = JSON.parse(user_dt).user;
    PubSub.publish("get_matches_list",user.id_user);
});