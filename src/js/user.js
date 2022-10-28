selectElement("login_btn-login").addEventListener("click", async function() {
    console.log("login button clicked");
    getloc_id = navigator.geolocation.watchPosition(make_login, error_get_position, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      });
    
    
    
});
selectElement("register_btn-login").addEventListener("click", function() {
    console.log("register button clicked");
    to_register();
});
function error_get_position(error){
    if (error.code == error.PERMISSION_DENIED)
      alert("Sem localização, sem cadastro. Aceite e dê refresh na página.");
  }
let getloc_id;
selectElement("register_btn-register").addEventListener("click", function() {
    
    getloc_id = navigator.geolocation.watchPosition(make_register, error_get_position, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      });
    
});

selectElement("login_btn-register").addEventListener("click", function() {
    console.log("login button clicked");
    to_login();
});
selectElement("logout_btn").addEventListener("click", function() {
    console.log("logout button clicked");
    localStorage.removeItem("user_dt");
    user_not_logged_startup()
});