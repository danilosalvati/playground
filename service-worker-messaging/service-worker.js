clients = []

self.addEventListener('message', function (event) {
    // Receive the data from the client
    let data = event.data;

    // The unique ID of the tab
    let clientId = event.source.id

    // A function that handles the message
    self.syncTabState(data, clientId);
});

self.sendTabState = function (client, data) {
    // Post data to a specific client
    client.postMessage(data);
}

self.syncTabState = function (data, clientId) {
    clients.matchAll().then(function (clients) {
        // Loop over all available clients
        clients.forEach(function (client) {

            console.log(`SERVICE WORKER: sending ${data} from ${client}`);

            self.sendTabState(client, data)

            // No need to update the tab that
            // sent the data
            //if (client.id !== clientId) {
            //    self.sendTabState(client, data)
            //}

        })
    })
}