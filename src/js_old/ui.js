PubSub.subscribe("init", function (msg, data) {
    console.log("UI init");
});
PubSub.subscribe("user_not_logged_startup", function (msg, data) {
    //redirect to login page
    console.log("user_not_logged_startup");
    //window.location.href = "src/login/login.html";
    $("#login-container").show();
    $("#register-container").hide();
    PubSub.publish("hide_album", null);
    $("#options-container").hide();
    $("#options-container").hide();
    PubSub.publish("hide_matches",null)
    pag_atual = "login"

});
PubSub.subscribe("hide_album", function (msg, data) {
    $("#card-list-container").empty();
    $("#album-container").hide();
});
PubSub.subscribe("hide_matches", function (msg, data) {
    $("#matches-container").hide();
});
PubSub.subscribe("user_logged_startup", function (msg, data) {
    //redirect to home page
    console.log("user_logged_startup");
    //window.location.href = "src/album/album.html";
    PubSub.publish("to_album", null);
    PubSub.publish("options-init", null);
    pag_atual = "album"
});
PubSub.subscribe("to_register", function (msg, data) {
    console.log("to_register");
    $("#login-container").hide();
    $("#register-container").show();
    PubSub.publish("hide_album", null);
    $("#options-container").hide();
    PubSub.publish("hide_matches",null)
    pag_atual = "register"
});
PubSub.subscribe("to_login", function (msg, data) {
    console.log("to_login");
    $("#login-container").show();
    $("#register-container").hide();
    PubSub.publish("hide_album", null);
    $("#options-container").hide();
    PubSub.publish("hide_matches",null)
    pag_atual = "login"
});
PubSub.subscribe("to_matches", function (msg, data) {
    console.log("to_matches");
    $("#login-container").hide();
    $("#register-container").hide();
    PubSub.publish("hide_album", null);
    $("#options-container").show();
    $("#matches-container").show();
    PubSub.publish("matches_init", null);
});
PubSub.subscribe("to_album", function (msg, data) {
    $("#login-container").hide();
    $("#register-container").hide();
    $("#album-container").show();
    $("#options-container").show();
    $("#card-list-container").empty();
    PubSub.publish("hide_matches",null)
    PubSub.publish("album_init", null);
    PubSub.publish("click_page_button", "album");
});
PubSub.subscribe("matches_list_response", function (msg, matches_list_response) {
    //clear the matches lists
    $(".matches-info-list-container").empty();
    //populate the matches lists
    matches_list_response.forEach(match => {
        let other_user = {}
        if (match.user_1.id_user == JSON.parse(localStorage.getItem("user_dt")).user.id_user) { other_user = match.user_2; } else {
            other_user = match.user_1;
        }
        const dt_match_readable_from_timestamp = new Date(match.timestamp_match * 1000).toLocaleString();
        let html = '<div class="match-info-container"><div class="match-data-container"><div class="match-user-info"><div class="match-user-photo-container"><img src="' + other_user.photo + '" alt="" srcset=""></div><p class="nome-match">Nome ' + other_user.name + '</p></div><p class="data-match">' + dt_match_readable_from_timestamp + '</p></div><div class="qtd-figs-match-container"><p class="qtd-figs-match"><b>' + match.figs_quantity + '</b> Figurinhas neste match</p></div></div>';
        //console.log(html);
        if(match.state.progress == 0){
            $("#matches-info-list-container-pendente").append(html);
        }else if(match.state.progress == 1){
            $("#matches-info-list-container-confirmado").append(html);
        }else if(match.state.progress == 2){
            $("#matches-info-list-container-concluido").append(html);
        }
    });

});
function selectElement(id) {
    return document.getElementById(id);
}
const pages = ["album", "matches"]
PubSub.subscribe("click_page_button", function (msg, data) {
    console.log("click_page_button");
    console.log(data);
    selectElement(data + "-selector-btn").classList.add("active-page-btn");
    for (var i = 0; i < 5; i++) {
        if (pages[i] != data) {
            try { selectElement(pages[i] + "-selector-btn").classList.remove("active-page-btn"); }
            catch (err) { }
        }
    }
});