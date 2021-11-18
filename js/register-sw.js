
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('../service-worker.js').then((message) => {
        console.log('Service Worker Registrado');
    });
} else {
    console.log('Service Worker no soportado');
}


