window.addEventListener('offline', event => {

    console.log('offline');
    localStorage.setItem('status', 'offline');
    handleOffline()
});

window.addEventListener('online', event => {

    console.log('online');
    localStorage.setItem('status', 'online');
    handleOnline()

});

window.addEventListener('load', event => {

    if ( navigator.onLine === false ) {

        handleOffline()
    }
    else {

        handleOnline()
    }
});

function handleOffline() {
    console.log('Sin conexión a internet');
    console.log(statusInternet);

    statusInternet.classList.remove('online');
    statusInternet.classList.add('offline');
    msgStatus.innerHTML = '';
    msgStatus.innerHTML = 'Offline';

    imgEspera.classList.remove('img-offline');
    imgEspera.classList.add('img-online');

    pJuegos.classList.remove('p-offline');
    pJuegos.classList.add('p-online');
}


function handleOnline() {
    console.log('Con conexión a internet')
    statusInternet.classList.remove('offline');
    statusInternet.classList.add('online');
    msgStatus.innerHTML = '';
    msgStatus.innerHTML = 'Online';

    imgEspera.classList.add('img-offline');
    imgEspera.classList.remove('img-online');

    pJuegos.classList.add('p-offline');
    pJuegos.classList.remove('p-online');
}


if (!navigator.onLine) {
    console.log('Sin conexión a internet');

} else {
    console.log('Con conexión a internet');

}


//1af0b29c-e575-4cfe-9751-922d6f454f86

const API_KEY = 'fe416fc4';
const lang = 'es';
let statusInternet = document.getElementById('status');
let msgStatus = document.getElementById('msgStatus');
let d = document;
let body = d.getElementById('body')
let search = d.getElementById('search');
let main = d.getElementById('poster');
// let divData = d.getElementById('movieData');
let buttom = d.getElementById('send');
let imgEspera = d.getElementById('espera');
let pJuegos = d.getElementById('p-juego');
const valorUltimaBusqueda = JSON.parse(localStorage.getItem('Respuesta API'));

let loadingMovie = d.getElementById('loading');


if (buttom != null) {
    buttom.addEventListener('click', () => {


        // console.log(search.value);


        loadingMovie.classList.add('active');

        fetch(`https://www.omdbapi.com/?t=${search.value}&apikey=${API_KEY}`
        ).then(function (response) {
            console.log(response);
            loadingMovie.classList.remove('active');
            return response.json();
        }).then(function (responseJSON) {
            console.log('imprimo json', responseJSON);
            drawMaker(responseJSON);
            return responseJSON;
        }).catch(function (error) {
                console.log('Fallo!', error)
            });

    })
}


function drawMaker(data) {

    console.log(data);

    if (data.Response == 'False') {

        main.innerHTML = "";
        let divData = d.createElement('div');
        divData.classList.add('container');
        divData.style.width = '18rem';
        main.appendChild(divData);

        let pError = d.createElement('p');
        pError.innerHTML = 'No se encontró ningún resultado';
        pError.classList.add('error');
        divData.appendChild(pError);
    } else {
        main.innerHTML = "";

        let divData = d.createElement('div');
        divData.classList.add('container', 'card');
        divData.style.width = '18rem';
        main.appendChild(divData);

        let imgMovie = d.createElement('img');
        imgMovie.src = data.Poster;
        imgMovie.alt = 'Card image cap';
        imgMovie.classList.add('card-img-top');
        divData.appendChild(imgMovie);

        let divMovie = d.createElement('div');
        divMovie.classList.add('card-body');
        divMovie.id = 'movieData';
        divData.appendChild(divMovie);

        let h2Movie = d.createElement('h2');
        h2Movie.innerHTML = data.Title;
        h2Movie.classList.add('card-titulo');
        divMovie.appendChild(h2Movie);

        let pMovie = d.createElement('p');
        pMovie.innerHTML = data.Plot;
        pMovie.classList.add('sinopsis');
        divMovie.appendChild(pMovie);

        let pMovieRate = d.createElement('p');
        pMovieRate.innerHTML = `Calificación: ${data.imdbRating} ✪`;
        pMovieRate.classList.add('sinopsis');
        divMovie.appendChild(pMovieRate);

        const list = JSON.parse(localStorage.getItem('Respuesta API'));

        if (list != null) {
            const isInList = list.some(item => item.Title === data.Title);

            if (isInList){
                crearBotonQuitar(data)
            }  else {
                crearBotonAgregar(data)
            }
        } else {
            crearBotonAgregar(data)
        }
    }
}


function crearBotonAgregar(data){
    let buscarDiv = d.getElementById('movieData');
    let aMovie = d.createElement('a');
    aMovie.innerHTML = 'Agregar';
    aMovie.id = 'verMasTarde';
    aMovie.classList.add('btn', 'btn-primary');


    aMovie.addEventListener('click', () => {
        console.log('click');
        saveMovieToStorage(data);
        aMovie.remove();
        crearBotonQuitar(data);
    })
    buscarDiv.appendChild(aMovie);
}

function crearBotonQuitar(data){
    let buscarDiv = d.getElementById('movieData');
    let aMovieDelete = d.createElement('a');
    aMovieDelete.innerHTML = 'Quitar';
    aMovieDelete.id = 'quitarDeLista';
    aMovieDelete.classList.add('btn', 'btn-danger', 'btn-quitar');

    aMovieDelete.addEventListener('click', () => {
        console.log('click');
        deleteMovieFromStorage(data);
        aMovieDelete.remove();
        crearBotonAgregar(data);
    })
    buscarDiv.appendChild(aMovieDelete);
}





const saveMovieToStorage = (data) => {
    console.log(data)
    //read 'Respuesta API' from localStorage as list
    const list = JSON.parse(localStorage.getItem('Respuesta API'));
    //Check if list is null
    if (list == null) {
        //if list is null, create a new list
        const newList = [];
        //add new movie to list
        newList.push(data);
        //save list to localStorage
        localStorage.setItem('Respuesta API', JSON.stringify(newList));
    } else {
        //Check if data is in list
        const isInList = list.some(item => item.Title === data.Title);
        //If not in list, add it
        if (!isInList) {
            list.push(data);
            localStorage.setItem('Respuesta API', JSON.stringify(list));
        }

    }

}


function deleteMovieFromStorage(data) {
    console.log(data)
    //lee 'Respuesta API' del localStorage
    const lista = JSON.parse(localStorage.getItem('Respuesta API'));
    //se fija si es null
    if (lista == null) {
        //si es null, crea una nueva lista
        const nuevaLista = [];
        //agrega el nuevo elemento
        nuevaLista.push(data);
        //graba la lista en el localStorage
        localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista));
    } else {
        //fija si el elemento esta en la lista
        const isInList = lista.some(item => item.Title === data.Title);
        //si esta, lo remueve
        if (isInList) {
            let nuevaLista = lista.filter(item => item.Title !== data.Title);
            localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista));
        }

    }

}


let mainVer = d.getElementById('ver-mas-tarde');


//read what is in localStorage
const listaStorage = JSON.parse(localStorage.getItem('Respuesta API'));

function sinPeliculas() {

    //if local storage is empty

    if (listaStorage === null || listaStorage.length === 0) {

        let h2Vacio = d.createElement('h2');
        h2Vacio.innerHTML = 'No hay peliculas agregadas';
        h2Vacio.classList.add('sin-peliculas');
        mainVer.appendChild(h2Vacio);

    }
}


//recorriendo la lista de objetos

console.log(mainVer);

function crearMostrador() {
    const listaVer = JSON.parse(localStorage.getItem('Respuesta API'));
    mainVer.innerHTML = "";


    if (listaVer != null && listaVer.length !== 0) {
        for (let movies of listaVer) {


            let divData = d.createElement('div');
            divData.classList.add('container', 'card');
            divData.style.width = '18rem';
            mainVer.appendChild(divData);

            let imgMovie = d.createElement('img');
            imgMovie.src = movies.Poster;
            imgMovie.alt = 'Card image cap';
            imgMovie.classList.add('card-img-top');
            divData.appendChild(imgMovie);

            let divMovie = d.createElement('div');
            divMovie.classList.add('card-body');
            divData.appendChild(divMovie);

            let h2Movie = d.createElement('h2');
            h2Movie.innerHTML = movies.Title;
            h2Movie.classList.add('card-titulo');
            divMovie.appendChild(h2Movie);

            let pMovie = d.createElement('p');
            pMovie.innerHTML = movies.Plot;
            pMovie.classList.add('sinopsis');
            divMovie.appendChild(pMovie);

            let pMovieRate = d.createElement('p');
            pMovieRate.innerHTML = `Calificación: ${movies.imdbRating} ✪`;
            pMovieRate.classList.add('sinopsis');
            divMovie.appendChild(pMovieRate);


            let aMovieDelete = d.createElement('a');
            aMovieDelete.innerHTML = 'Quitar';
            // aMovieDelete.id = 'quitarDeListaVer';
            aMovieDelete.classList.add('btn', 'btn-danger', 'quitarDeListaVer');
            divMovie.appendChild(aMovieDelete);

            aMovieDelete.addEventListener('click', () => {
                console.log('click');
                deleteMovieFromStorage(movies);
                crearMostrador();


            })

        }
    }


}







