PubSub.subscribe("init", function(msg, data) {
    console.log("UI init");
});
PubSub.subscribe("user_not_logged_startup", function(msg, data) {
    //redirect to login page
    console.log("user_not_logged_startup");
    window.location.href = "src/login/login.html";

});
PubSub.subscribe("user_logged_startup", function(msg, data) {
    //redirect to home page
    console.log("user_logged_startup");
    window.location.href = "src/album/album.html";
});


function selectElement(id) {
    return document.getElementById(id);
}
