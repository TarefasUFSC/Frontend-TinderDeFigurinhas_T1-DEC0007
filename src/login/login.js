

function selectElement(id) {
    return document.getElementById(id);
}

selectElement("login_btn").addEventListener("click", function() {
    console.log("login button clicked");
    const user = selectElement("username").value;
    const pass = selectElement("password").value;
    const data = {email : user, password : pass};
    PubSub.publish("login", data);
});