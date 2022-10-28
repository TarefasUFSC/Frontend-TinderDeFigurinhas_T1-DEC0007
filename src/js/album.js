// wait for dom load
$(document).ready(function() {
    to_togin();
});
function hide_album(){
    $("#card-list-container").empty();
    $("#album-container").hide();
}
function hide_matches(){
    $("#matches-container").hide();
}


// routing functions
function to_togin(){
    console.log("to_login");
    $("#login-container").show();
    $("#register-container").hide();
    hide_album();
    $("#options-container").hide();
    hide_matches();
    //pag_atual = "login"
}
function to_register(){
    console.log("to_register");
    $("#login-container").hide();
    $("#register-container").show();
    hide_album();
    $("#options-container").hide();
    hide_matches();
    //pag_atual = "register"
}
