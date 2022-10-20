var user_dt;
PubSub.subscribe("album_init",  function(msg, data) {
    console.log("album init");

    user_dt =  getUserData();
    if(user_dt) {
        const user = JSON.parse(user_dt);
        console.log(user);    }
        else {
            console.log("user not logged");
            window.location.href = "../login/login.html";
        }

});
function getUserData(){
    return localStorage.getItem("user_dt");
}
