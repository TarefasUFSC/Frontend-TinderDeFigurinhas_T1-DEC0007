PubSub.subscribe("album_init",  async function(msg, data) {
    console.log("album init");
    const user =  await getUserData();
    const dt = {id_user: user.id_user}
    
    $.ajax({
        url: servidorRest + "/user/figurinha",
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: "application/json",
        dataType: 'json',
        success: function(res) {
            console.log(res);
            for(let i = 0; i < res.unique_figs.length; i++) {
                const fig = res.unique_figs[i];
                const t_html = '<div class="card-container"><img src="'+fig.photo_url+'" alt="" srcset="" class="imagem-figure-lista"></div>';
                $("#card-list-container").append(t_html);
            }
            for(let i = 0; i < res.repeated_figs.length; i++) {
                const fig = res.repeated_figs[i];
                const t_html = '<div class="card-container"><img src="'+fig.photo_url+'" alt="" srcset="" class="imagem-figure-lista"></div>';
                $("#card-list-container").append(t_html);
            }
        },
        error: function(data){
            console.log(data.responseText);
        }
    });
});
async function getUserData(){
    return JSON.parse(localStorage.getItem("user_dt")).user;
}
