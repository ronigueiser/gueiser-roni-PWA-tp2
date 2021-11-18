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



function drawMaker(data){

    main.innerHTML = "";

    let imgMovie = d.createElement('img');
    imgMovie.src = data.Poster;
    imgMovie.alt = 'Card image cap';
    imgMovie.classList.add('card-img-top');
    main.appendChild(imgMovie);

    let divMovie = d.createElement('div');
    divMovie.classList.add('card-body');
    main.appendChild(divMovie);

    let h2Movie = d.createElement('h2');
    h2Movie.innerHTML = data.Title;
    divMovie.appendChild(h2Movie);

    let pMovie = d.createElement('p');
    pMovie.innerHTML = data.Plot;
    divMovie.appendChild(pMovie);

    let aMovie = d.createElement('a');
    aMovie.innerHTML = 'Ver mas tarde';
    aMovie.id = 'verMasTarde';
    aMovie.href = '#';
    divMovie.appendChild(aMovie);
}


function agregarParaVerMasTarde(data){
    const verMasTarde = d.getElementById('verMasTarde');
    verMasTarde.addEventListener('click', () => {
        console.log('click');
        saveMovieToStorage(data);
    })

}


const saveMovieToStorage = (data) => {
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