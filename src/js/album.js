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