window.addEventListener('offline', event => {
    console.log('Sin conexión a internet');
});

window.addEventListener('online', event => {
    console.log('Con conexión a internet');
});


if (!navigator.onLine) {
    console.log('Sin conexión a internet');
} else {
    console.log('Con conexión a internet');
}



//1af0b29c-e575-4cfe-9751-922d6f454f86

const API_KEY = 'fe416fc4';
const lang = 'es';

let d = document;
let body = d.getElementById('body')
let search = d.getElementById('search');
let main = d.getElementById('poster');
// let divData = d.getElementById('movieData');
let buttom = d.getElementById('send');

const valorUltimaBusqueda = JSON.parse(localStorage.getItem('Respuesta API'));

if (valorUltimaBusqueda != null){
    // drawMaker(valorUltimaBusqueda);
}

if (buttom != null) {
    buttom.addEventListener('click', () => {


        // console.log(search.value);

        fetch(`http://www.omdbapi.com/?t=${search.value}&apikey=${API_KEY}`
        ).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (responseJSON){
            console.log('imprimo json', responseJSON);
            drawMaker(responseJSON);
            return responseJSON;
        }).then((returnJSON) => agregarParaVerMasTarde(returnJSON))
            .catch(function (error){
                console.log('Fallo!',error)
            });

    })
}




function drawMaker(data){

    console.log(data);

    if (data.Response == 'False'){

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
        divData.appendChild(divMovie);

        let h2Movie = d.createElement('h2');
        h2Movie.innerHTML = data.Title;
        h2Movie.classList.add('card-titulo');
        divMovie.appendChild(h2Movie);

        let pMovie = d.createElement('p');
        pMovie.innerHTML = data.Plot;
        pMovie.classList.add('sinopsis');
        divMovie.appendChild(pMovie);

        let aMovie = d.createElement('a');
        aMovie.innerHTML = 'Agregar';
        aMovie.id = 'verMasTarde';
        aMovie.href = '#';
        aMovie.classList.add('btn', 'btn-primary');
        divMovie.appendChild(aMovie);

        let aMovieDelete = d.createElement('a');
        aMovieDelete.innerHTML = 'Quitar';
        aMovieDelete.id = 'quitarDeLista';
        aMovieDelete.classList.add('btn', 'btn-danger', 'btn-quitar');
        aMovieDelete.href = '#';
        divMovie.appendChild(aMovieDelete);
    }


}


function agregarParaVerMasTarde(data){
    const verMasTarde = d.getElementById('verMasTarde');
    verMasTarde.addEventListener('click', () => {
        console.log('click');
        saveMovieToStorage(data);
    })

    const quitarDeLista = d.getElementById('quitarDeLista');
    quitarDeLista.addEventListener('click', () => {
        console.log('click');
        deleteMovieFromStorage(data);
    })

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

function deleteMovieFromStorage (data){
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


//
//
//
//
// let mainVer = d.getElementById('ver-mas-tarde');
//
// //read what is in localStorage
// const listaVer = JSON.parse(localStorage.getItem('Respuesta API'));
// console.log('lista', listaVer);
//
// //recorrendo la lista de objetos
// function crearMostrador (){
//     for (let movies of listaVer){
//
//         let divData = d.createElement('div');
//         divData.classList.add('container', 'card');
//         divData.style.width = '18rem';
//         mainVer.appendChild(divData);
//
//         let imgMovie = d.createElement('img');
//         imgMovie.src = movies.Poster;
//         imgMovie.alt = 'Card image cap';
//         imgMovie.classList.add('card-img-top');
//         divData.appendChild(imgMovie);
//
//         let divMovie = d.createElement('div');
//         divMovie.classList.add('card-body');
//         divData.appendChild(divMovie);
//
//         let h2Movie = d.createElement('h2');
//         h2Movie.innerHTML = movies.Title;
//         h2Movie.classList.add('card-titulo');
//         divMovie.appendChild(h2Movie);
//
//         let pMovie = d.createElement('p');
//         pMovie.innerHTML = movies.Plot;
//         pMovie.classList.add('sinopsis');
//         divMovie.appendChild(pMovie);
//
//         // let aMovie = d.createElement('a');
//         // aMovie.innerHTML = 'Agregar';
//         // // aMovie.id = 'verMasTarde';
//         // aMovie.href = '#';
//         // aMovie.classList.add('btn', 'btn-primary',);
//         // divMovie.appendChild(aMovie);
//
//         let aMovieDelete = d.createElement('a');
//         aMovieDelete.innerHTML = 'Quitar';
//         // aMovieDelete.id = 'quitarDeListaVer';
//         aMovieDelete.classList.add('btn', 'btn-danger', 'btn-quitar', `${movies.Title}`, 'quitarDeListaVer');
//         aMovieDelete.href = '#';
//         divMovie.appendChild(aMovieDelete);
//
//     }
// }
//
// crearMostrador();
//
// let buttonQuitar = d.getElementsByClassName('quitarDeListaVer');
// console.log(buttonQuitar);
//
// for (let botonUnico of buttonQuitar){
//     console.log(botonUnico);
// }
//
// buttonQuitar.addEventListener('click', (e) => {
//
//     deleteMovieFromStorage(listaVer);
// })
