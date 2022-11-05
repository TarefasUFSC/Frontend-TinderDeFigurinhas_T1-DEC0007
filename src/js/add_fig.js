let searched_fig_id = null;
let searched_fig_qtd = 0;

function callback_searched_fig_id_success(data){
    console.log(data);
    searched_fig_id = data.id;
    // clear the container
    let html = `
    <div class='search-result-fig-container'>
        <img src='${data.photo_url}' alt='fig1' class='search-result-fig-img'>
        <div class='search-result-actions'><p id='search-result-fig-qtd' class='search-result-fig-qtd'>${searched_fig_qtd}</p>
            <div class='qtd-actions'>
                <button id='search-result-fig-btn-add' class='search-result-fig-btn add-btn'>+</button>
                <button id='search-result-fig-btn-sub' class='search-result-fig-btn sub-btn'>-</button>

            </div>
            <button id='search-result-fig-btn-new' class='search-result-fig-btn add-new-btn'>Adicionar</button>
        </div>
    </div>`;

    $("#search-fig-result-container").append(html);
    selectElement("search-result-fig-btn-add").addEventListener("click", function (e) {
        searched_fig_qtd++;
        selectElement("search-result-fig-qtd").innerHTML = searched_fig_qtd;
    });
    selectElement("search-result-fig-btn-sub").addEventListener("click", function (e) {
        if (searched_fig_qtd > 0) {
            searched_fig_qtd--;
            selectElement("search-result-fig-qtd").innerHTML = searched_fig_qtd;
        }
    });
    selectElement("search-result-fig-btn-new").addEventListener("click", function (e) {
        if (searched_fig_qtd > 0) {
            let fig_list = [];
            for (let i = 0; i < searched_fig_qtd; i++) {
                fig_list.push(searched_fig_id);
            }
            const data = 
            {
                "id_user":user_dt.id_user,
                "new_figures":fig_list
            };
            console.log(data);
            $.ajax({
                url: servidorRest + "/user/figurinha/new",
                type: 'PUT',
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json',
                success: function(res) {
                    console.log(res);
                    if(res.error){
                        alert(res.error);
                    }else{
                        alert("Figurinhas adicionadas com sucesso!");
                        init_album();
                    }
                },
                error: function (xhr, status, error) {            
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    alert(xhr.responseJSON.error)
                }
            });
        }
    });
}
selectElement("search-fig-btn").addEventListener("click", function () {
    console.log("search figure button clicked");
    searched_fig_qtd = 0;
    const search = (parseInt(selectElement("search-fig-input").value)).toString();
    //search = (parseInt(search))
    $("#search-fig-result-container").empty();
    if (search != 'NaN') {
        // search is a number
        // make a ajax get to api
        $.ajax({
            url: servidorRest + "/figurinha/" + search,
            type: "GET",
            success: callback_searched_fig_id_success,
            error: function (xhr, status, error) {
                console.log(xhr);
                let html = `<p>${xhr.responseJSON["error"]}</p>`
                $("#search-fig-result-container").append(html);

            }
        });


    } else {
        let html = `<p>Por favor, insira um número válido</p>`
        $("#search-fig-result-container").append(html);
    }
});

