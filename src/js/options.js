var pag_atual = ""
PubSub.subscribe("options-init", function(msg, data) {
    console.log("options init");
    selectElement("album-selector-btn").addEventListener("click", function() {
        if(pag_atual != "album") {
            PubSub.publish("click_page_button", "album");
            PubSub.publish("to_album", null);
            pag_atual = "album"
        }
    });
    selectElement("matches-selector-btn").addEventListener("click", function() {
        if(pag_atual != "matches") {
            PubSub.publish("click_page_button", "matches");
            PubSub.publish("to_matches", null);
            pag_atual = "matches"
        }
    });
})