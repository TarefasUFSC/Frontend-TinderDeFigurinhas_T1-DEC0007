PubSub.subscribe("album_init",  async function(msg, data) {
    console.log("album init");
    const user =  await getUserData();
    if(user != null){
    const dt = {id_user: user.id_user}
    
    $("#card-list-container").empty();
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
                const t_html = '<div class="card-container" id="uf-'+fig.id_figure+'"><img src="'+fig.photo_url+'" alt="" srcset="" class="imagem-figure-lista"></div>';
                $("#card-list-container").append(t_html);
                $("#uf-"+fig.id_figure).addClass("unique-figure-album");
            }
            for(let i = 0; i < res.repeated_figs.length; i++) {
                const fig = res.repeated_figs[i];
                const t_html = '<div class="card-container" id="rf-'+fig.id_figure+'"><img src="'+fig.photo_url+'" alt="" srcset="" class="imagem-figure-lista"></div>';
                $("#card-list-container").append(t_html);
                $("#rf-"+fig.id_figure).addClass("repeated-figure-album");
            }
        },
        error: function(data){
            console.log(data.responseText);
        }
    });}
});
async function getUserData(){
    return JSON.parse(localStorage.getItem("user_dt")).user;
}
