async function init_album() {
    console.log("album init");
    const user = await getUserData();
    if (user != null) {
        const dt = { id_user: user.id_user }

        get_album_list(dt);
    }
}
async function getUserData() {
    return JSON.parse(localStorage.getItem("user_dt")).user;
}

selectElement('add-figure-btn').addEventListener('click', function () {
    console.log("add figure button clicked");
    
    $("#add-figure-popup-container").show();
});
selectElement("add-figure-popup-close").addEventListener("click", function () {
    console.log("add figure popup close button clicked");
    $("#add-figure-popup-container").hide();
});