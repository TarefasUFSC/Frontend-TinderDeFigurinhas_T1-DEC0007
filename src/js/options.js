PubSub.subscribe("options-init", function(msg, data) {
    console.log("options init");
    selectElement("album-selector-btn").addEventListener("click", function() {
        PubSub.publish("click_page_button", "album");
        PubSub.publish("to_album", null);
    });
    selectElement("matches-selector-btn").addEventListener("click", function() {
        PubSub.publish("click_page_button", "matches");
        PubSub.publish("to_matches", null);
    });
})