//
// import Var from "main.js";
//
//
//
//
// // A partir de aca comienzan las funcionalidades para ver.html
// let d = document;
// // let mainVer = document.getElementById('ver-mas-tarde');
// //
// // //read what is in localStorage
// // const lista = JSON.parse(localStorage.getItem('Respuesta API'));
// // console.log('lista', lista);
// //
// // //recorrendo la lista de objetos
// // function crearMostrador (){
// //     for (let movies of lista){
// //
// //         let divData = d.createElement('div');
// //         divData.classList.add('container', 'card');
// //         divData.style.width = '18rem';
// //         mainVer.appendChild(divData);
// //
// //         let imgMovie = d.createElement('img');
// //         imgMovie.src = movies.Poster;
// //         imgMovie.alt = 'Card image cap';
// //         imgMovie.classList.add('card-img-top');
// //         divData.appendChild(imgMovie);
// //
// //         let divMovie = d.createElement('div');
// //         divMovie.classList.add('card-body');
// //         divData.appendChild(divMovie);
// //
// //         let h2Movie = d.createElement('h2');
// //         h2Movie.innerHTML = movies.Title;
// //         h2Movie.classList.add('card-titulo');
// //         divMovie.appendChild(h2Movie);
// //
// //         let pMovie = d.createElement('p');
// //         pMovie.innerHTML = movies.Plot;
// //         pMovie.classList.add('sinopsis');
// //         divMovie.appendChild(pMovie);
// //
// //         let aMovie = d.createElement('a');
// //         aMovie.innerHTML = 'Agregar';
// //         aMovie.id = 'verMasTarde';
// //         aMovie.href = '#';
// //         aMovie.classList.add('btn', 'btn-primary');
// //         divMovie.appendChild(aMovie);
// //
// //         let aMovieDelete = d.createElement('a');
// //         aMovieDelete.innerHTML = 'Quitar';
// //         aMovieDelete.id = 'quitarDeLista';
// //         aMovieDelete.classList.add('btn', 'btn-danger', 'btn-quitar');
// //         aMovieDelete.href = '#';
// //         divMovie.appendChild(aMovieDelete);
// //
// //     }
// // }
//
// // crearMostrador();
// //
// // agregarParaVerMasTarde();
// // deleteMovieFromStorage();
//
// //
// // function eliminarPeliculaVerMas (data){
// //     //lee 'Respuesta API' del localStorage
// //     const lista = JSON.parse(localStorage.getItem('Respuesta API'));
// //     //se fija si es null
// //     if (lista == null) {
// //         //si es null, crea una nueva lista
// //         const nuevaLista = [];
// //         //agrega el nuevo elemento
// //         nuevaLista.push(data);
// //         //graba la lista en el localStorage
// //         localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista));
// //     } else {
// //         //fija si el elemento esta en la lista
// //         const isInList = lista.some(item => item.Title === data.Title);
// //         //si esta, lo remueve
// //         if (isInList) {
// //             let nuevaLista = lista.filter(item => item.Title !== data.Title);
// //             localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista));
// //         }
// //
// //     }
// //
// // }
// // eliminarPeliculaVerMas();
//
//
