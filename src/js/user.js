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
    localStorage.setItem("user_dt", JSON.stringify(data));
    PubSub.publish("user_logged_startup", data);
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

selectElement("login_btn-login").addEventListener("click", async function() {
    console.log("login button clicked");
    const user = selectElement("username-login").value;
    const pass = selectElement("password-login").value;
    navigator.geolocation.watchPosition(function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);
        
        const data = {email : user, password : pass,last_login_position : {lat : lat, lng : lng}};
        PubSub.publish("login", data);
      },
      function(error) {
        if (error.code == error.PERMISSION_DENIED)
          alert("Sem localização, sem login. Aceite e dê refresh na página.");
      });
    
});
selectElement("register_btn-login").addEventListener("click", function() {
    console.log("register button clicked");
    PubSub.publish("to_register", null);
});

selectElement("register_btn-register").addEventListener("click", function() {
    console.log("register button clicked");
    const user = selectElement("username-register").value;
    const nome = selectElement("nome").value;
    const pass = selectElement("password-register").value;
    const ctt_type = selectElement("contato-tipo").value;
    const ctt = selectElement("contato-valor").value;
    navigator.geolocation.watchPosition(function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);
        const data = { 
            name: nome,
            email: user,
            password: pass, 
            contact_type: ctt_type, 
            contact_value: ctt, 
            photo: "String (base64)", 
            last_login_position : {lat : lat, lng : lng}};
        PubSub.publish("register", data);
      },
      function(error) {
        if (error.code == error.PERMISSION_DENIED)
          alert("Sem localização, sem cadastro. Aceite e dê refresh na página.");
      });
    c
});
selectElement("login_btn-register").addEventListener("click", function() {
    console.log("login button clicked");
    PubSub.publish("to_login", null);
});
selectElement("logout_btn").addEventListener("click", function() {
    console.log("logout button clicked");
    localStorage.removeItem("user_dt");
    PubSub.publish("user_not_logged_startup", null);
});