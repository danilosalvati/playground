function stateToServiceWorker(data) {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(data);
    }
}

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('service-worker.js')
        .then(function () {
            return navigator.serviceWorker.ready;
        })
        .then(function (reg) {

            console.log('Registering listener');

            // Here we add the event listener for receiving messages
            navigator.serviceWorker.addEventListener('message', function (event) {
                console.log('Receiving data');
                console.log(event.data)
            });

        }).catch(function (error) {
        console.error('Service Worker registration error : ', error);
    });

}