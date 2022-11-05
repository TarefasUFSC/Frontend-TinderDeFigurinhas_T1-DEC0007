// wait for dom load
$(document).ready(function () {
    // verify if user is logged
    $("#add-figure-popup-container").hide();
    user_dt = localStorage.getItem("user_dt");
    if (user_dt) {
        user_logged_startup();
    }
    else {
        user_not_logged_startup();
    }
});


function selectElement(id) {
    return document.getElementById(id);
}


function hide_album() {
    $("#card-list-container").empty();
    $("#album-container").hide();
    $("#add-figure-button-container").hide();
}
function hide_matches() {
    $("#matches-container").hide();
}


// startup functions
function user_not_logged_startup() {

    startConnectionWebsocket();
    console.log("user not logged startup");
    // fecho a conexão do websocket se existir
    to_login();
}
function user_logged_startup() {
    console.log("user logged startup");
    // aqui eu tenho que chamar a conexão do websocket tb
    to_album();
}


// routing functions, to change page
function to_login() {
    console.log("to_login");
    $("#login-container").show();
    $("#register-container").hide();
    hide_album();
    $("#options-container").hide();
    hide_matches();
    pag_atual = "login"
}
function to_register() {
    console.log("to_register");
    $("#login-container").hide();
    $("#register-container").show();
    hide_album();
    $("#options-container").hide();
    hide_matches();
    pag_atual = "register"
}
function to_album() {
    $("#login-container").hide();
    $("#register-container").hide();
    $("#album-container").show();
    $("#options-container").show();
    $("#add-figure-button-container").show();
    $("#card-list-container").empty();
    click_page_button("album");
    hide_matches();
    init_album();
    pag_atual = "album"
}
function to_matches() {
    console.log("to_matches");
    $("#login-container").hide();
    $("#register-container").hide();
    hide_album();
    $("#options-container").show();
    $("#matches-container").show();
    click_page_button("matches");
    init_matches();
    pag_atual = "matches"
}


// pupulate functions
function matches_list_response(data) {
    $(".matches-info-list-container").empty();
    //populate the matches lists
    data.forEach(match => {
        let other_user = {}
        if (match.user_1.id_user == user_dt.id_user) {
            other_user = match.user_2;
        } else {
            other_user = match.user_1;
        }
        const dt_match_readable_from_timestamp = new Date(match.timestamp_match * 1000).toLocaleString();
        let foto;
        if(other_user.photo){
            foto = other_user.photo;
        }else{
            console.log("foto do user não existe");
            foto = 'src/assets/img/default_user_icon.png';
        }
        let html = '<div class="match-info-container"><div class="match-data-container"><div class="match-user-info"><div class="match-user-photo-container"><img src="' + foto + '" alt="" srcset=""></div><p class="nome-match">Nome ' + other_user.name + '</p></div><p class="data-match">' + dt_match_readable_from_timestamp + '</p></div><div class="qtd-figs-match-container"><p class="qtd-figs-match"><b>' + match.figs_quantity + '</b> Figurinhas neste match</p></div></div>';
        //console.log(html);
        if (match.state.progress == 0) {
            $("#matches-info-list-container-pendente").append(html);
        } else if (match.state.progress == 1) {
            $("#matches-info-list-container-confirmado").append(html);
        } else if (match.state.progress == 2) {
            $("#matches-info-list-container-concluido").append(html);
        }
    });
}
