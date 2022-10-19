PubSub.subscribe("init", function(msg, data) {
    console.log("UI init");
});

function selectElement(id) {
    return document.getElementById(id);
}

selectElement("botao").addEventListener("click", function(){
    PubSub.publish("enviar", {msg:"botao apertado"});
})