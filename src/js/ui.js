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

});
PubSub.subscribe("user_logged_startup", function(msg, data) {
    //redirect to home page
    console.log("user_logged_startup");
    //window.location.href = "src/album/album.html";
    $("#login-container").hide();
    $("#register-container").hide();
    $("#album-container").show();
});
PubSub.subscribe("login_to_register", function(msg, data) {
    console.log("login_to_register");
    $("#login-container").hide();
    $("#register-container").show();
    $("#album-container").hide();
});
PubSub.subscribe("register_to_login", function(msg, data) {
    console.log("register_to_login");
    $("#login-container").show();
    $("#register-container").hide();
    $("#album-container").hide();
});

function selectElement(id) {
    return document.getElementById(id);
}
