
var ws;
function startConnectionWebsocket() {
    ws = new ReconnectingWebSocket(servidorWebsocket);
    ws.onopen = function(event) {
        ws.send(JSON.stringify({msg : "hello server"}));
    };
    ws.onmessage = function(event) {
        console.log(event);
        rsp = JSON.parse(event.data)
        if(rsp.type == 'login'){
            login_response(rsp.data)
        }

    }
}

function make_login(position){
    console.log("login");
    const user = selectElement("username-login").value;
    const pass = selectElement("password-login").value;
    let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);
        
        const data = {email : user, password : pass,last_login_position : {lat : lat, lng : lng}};
        
    ws.send(JSON.stringify({type : "login", data : data}));
    
    navigator.geolocation.clearWatch(getloc_id);
}
function login_response(data){
    console.log("login response receved");
    if(data.error){
        console.log("error");
        alert(data.error);
    }else{
        console.log("success");
        console.log();
        localStorage.setItem("user_dt", JSON.stringify(data.user));
        user_logged_startup();
    }
}
function make_register(position){
    console.log("register");
    console.log("register button clicked");
    const user = selectElement("username-register").value;
    const nome = selectElement("nome").value;
    const pass = selectElement("password-register").value;
    const ctt_type = selectElement("contato-tipo").value;
    const ctt = selectElement("contato-valor").value;
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
    // send a post to api
    $.ajax({
        url: servidorRest + "/user/signup",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            register_response(data);
            
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(xhr.responseJSON.error)
        }
    });
    
    navigator.geolocation.clearWatch(getloc_id);
}
function register_response(data){
    console.log("register_response");
    console.log(data);
    to_login();
}

function get_matches_list(id_user){
    const data = {id_user : id_user};
    $.ajax({
        url: servidorRest + "/user/match",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (dt_r) {
            console.log(dt_r);
            if(dt_r.error){
            console.log("nenhum match");
            }else{
                matches_list_response(dt_r);
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert(xhr.responseJSON.error)
        }
    });
}
function get_album_list(dt){
    $("#card-list-container").empty();
    $.ajax({
        url: servidorRest + "/user/figurinha",
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: "application/json",
        dataType: 'json',
        success: function(res) {
            console.log(res);
            for(let i = 0; i < res.unique_figs.length; i++) {
                const fig = res.unique_figs[i];
                const t_html = '<div class="card-container" id="uf-'+fig._id+'"><img src="'+fig.photo_url+'" alt="" srcset="" class="imagem-figure-lista"></div>';
                $("#card-list-container").append(t_html);
                $("#uf-"+fig._id).addClass("unique-figure-album");
            }
            for(let i = 0; i < res.repeated_figs.length; i++) {
                const fig = res.repeated_figs[i];
                const t_html = '<div class="card-container" id="rf-'+fig._id+'"><img src="'+fig.photo_url+'" alt="" srcset="" class="imagem-figure-lista"></div>';
                $("#card-list-container").append(t_html);
                $("#rf-"+fig._id).addClass("repeated-figure-album");
            }
        },
        error: function(data){
            console.log(data.responseText);
        }
    });
}