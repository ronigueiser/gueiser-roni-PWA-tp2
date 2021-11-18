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
let buttom = d.getElementById('send');
const valorUltimaBusqueda = JSON.parse(localStorage.getItem('Respuesta API'));

if (valorUltimaBusqueda != null){
    // drawMaker(valorUltimaBusqueda);
}


buttom.addEventListener('click', () => {


    // console.log(search.value);

    fetch(
        // `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${API_KEY}&lang=${lang}&units=metric`
        `http://www.omdbapi.com/?t=${search.value}&apikey=${API_KEY}`
    ).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (responseJSON){
        console.log('imprimo json', responseJSON);
        drawMaker(responseJSON);
        // saveLocalStorage(responseJSON);


    }).catch(function (error){
        console.log('Fallo!',error)
    });
})



function drawMaker(data){



    let imgMovie = d.createElement('img');
    imgMovie.src = data.Poster;
    main.appendChild(imgMovie);

    let h2Movie = d.createElement('h2');
    h2Movie.innerHTML = data.Title;
    main.appendChild(h2Movie);

    let pMovie = d.createElement('p');
    pMovie.innerHTML = data.Plot;
    main.appendChild(pMovie);
}