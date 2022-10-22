var user_dt;
PubSub.subscribe("album_init",  function(msg, data) {
    console.log("album init");

    PubSub.publish("click_page_button", "album");

});
function getUserData(){
    return localStorage.getItem("user_dt");
}
