//document ready event
$(function () {

    $('#buscar').click(() => { //Capturar evento click
        buscarSuperhero();

    })

    $('#limpiar').click(() => {
        limpiar()
    })

})

//funcion buscar personaje captura datos ingresador por usuario

function buscarSuperhero() {
    let id_Superhero = $('#input_busqueda').val()

    if (validacion(id_Superhero) == false) {

        errorInput();
        return
    }

    getSuperhero(id_Superhero)

}

//validacion datos ingresados por usuario

function validacion(id) {

    let expresion = /^\d{1,3}$/

    if (expresion.test(id)) {
        return true;
    }
    return false;
}

function errorInput() {
    alert("Dato inválido, ingrese un número del 1 al 731");
    $('#input_busqueda').focus();
}


function getSuperhero(id) {

    $.ajax({
        type: "GET",
        url: `https://superheroapi.com/api.php/10225987047762296/${id}`,
        success: function (response) {
            console.log((response))

            $('#cards').append(creacionCard(response))
            $('#input_busqueda').val("")
            $('#input_busqueda').focus()


        },
        error: function (error) {
            console.log(error)
        }
    })
}

function creacionCard(Superhero) {
    let card = `
    <div class="col-12 col-md-4 mb-5">
        <div class="card mx-auto" style="width: 18rem;">
            <img src="${Superhero.image.url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${Superhero.name}</h5>
            <p class="card-text">Conexiones:${Superhero.connections["group-affiliation"]}</p>
            </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Publicado por:${Superhero.biography.publisher}  </li>
                <li class="list-group-item">Ocupación: ${Superhero.work.occupation}</li>
                <li class="list-group-item">Primera aparición: ${Superhero.biography["first-appearance"]}</li>
                <li class="list-group-item">Altura: ${Superhero.appearance.height}</li>
                <li class="list-group-item">Peso: ${Superhero.appearance.weight}</li>
                <li class="list-group-item">Alias: ${Superhero.biography.aliases}</li>
                </ul>
                
            </div>
        </div>
    </div>
    `
    return card
}

function limpiar() {
    $('#buscar').empty()
    $('#input_busqueda').focus()
}