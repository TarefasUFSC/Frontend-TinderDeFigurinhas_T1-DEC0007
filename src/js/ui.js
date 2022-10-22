PubSub.subscribe("init", function(msg, data) {
    console.log("UI init");
});
PubSub.subscribe("user_not_logged_startup", function(msg, data) {
    //redirect to login page
    console.log("user_not_logged_startup");
    //window.location.href = "src/login/login.html";
    $("#login-container").show();
    $("#register-container").hide();
    $("#album-container").hide();
    $("#options-container").hide();
    $("#options-container").hide();
    $("#matches-container").hide();

});
PubSub.subscribe("user_logged_startup", function(msg, data) {
    //redirect to home page
    console.log("user_logged_startup");
    //window.location.href = "src/album/album.html";
    PubSub.publish("to_album", null);
    PubSub.publish("options-init", null);
});
PubSub.subscribe("to_register", function(msg, data) {
    console.log("to_register");
    $("#login-container").hide();
    $("#register-container").show();
    $("#album-container").hide();
    $("#options-container").hide();
    $("#matches-container").hide();
});
PubSub.subscribe("to_login", function(msg, data) {
    console.log("to_login");
    $("#login-container").show();
    $("#register-container").hide();
    $("#album-container").hide();
    $("#options-container").hide();
    $("#matches-container").hide();
});
PubSub.subscribe("to_matches", function(msg, data) {
    $("#login-container").hide();
    $("#register-container").hide();
    $("#album-container").hide();
    $("#options-container").show();
    $("#matches-container").show();
    PubSub.publish("matches_init", null);
});
PubSub.subscribe("to_album", function(msg, data) {
    $("#login-container").hide();
    $("#register-container").hide();
    $("#album-container").show();
    $("#options-container").show();
    $("#matches-container").hide();
    PubSub.publish("album_init", null);
});
function selectElement(id) {
    return document.getElementById(id);
}
const pages = ["album","matches"]
PubSub.subscribe("click_page_button", function(msg, data) {
    console.log("click_page_button");
    console.log(data);
    selectElement(data + "-selector-btn").classList.add("active-page-btn");
    for(var i = 0; i < 5; i++) {
        if(pages[i] != data) {
            try{selectElement(pages[i] + "-selector-btn").classList.remove("active-page-btn");}
            catch(err) {}
        }
    }
});