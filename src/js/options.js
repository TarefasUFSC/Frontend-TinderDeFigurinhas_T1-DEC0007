var pag_atual = ""
function init_options(){
    console.log("options init");
    
}
selectElement("album-selector-btn").addEventListener("click", function() {
    if(pag_atual != "album") {
        to_album();
        pag_atual = "album"
    }
});
selectElement("matches-selector-btn").addEventListener("click", function() {
    if(pag_atual != "matches") {
        to_matches();
        pag_atual = "matches"
    }
});

//routing functions, on options
const pages = ["album", "matches"]
function click_page_button(data) {
    console.log("click_page_button");
    console.log(data);
    selectElement(data + "-selector-btn").classList.add("active-page-btn");
    for (var i = 0; i < 5; i++) {
        if (pages[i] != data) {
            try { selectElement(pages[i] + "-selector-btn").classList.remove("active-page-btn"); }
            catch (err) { }
        }
    }
};
