let cached = null;

self.addEventListener('message', function (event) {
    // Receive the data from the client
    let data = event.data;
    if (data === 'getRemoteData') {
        //TODO: Implement response with MessageChannel as done by http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html#.XQ65lnXFKkA
        let response = self.getCachedData();
        let client = event.source.id
        console.warn(`[SERVICE WORKER]: Sending data back to the client ${client.id} with url ${client.url} and type ${client.type}`);

    }

    // // The unique ID of the tab
    // let clientId = event.source.id
    // self.sendTabState(event.source, `Hello client ${clientId} I received this message from you: ${data}`);
    //
    // // A function that handles the message
    // self.syncTabState(data, clientId);
});

self.getCachedData = () => {
    cached = cached || getRemoteData()
    return cached;
}

self.sendTabState = function (client, data) {
    // Post data to a specific client
    client.postMessage(data);
}

self.syncTabState = function (data, clientId) {
    self.clients.matchAll().then(function (clients) {
        // Loop over all available clients
        clients.forEach(function (client) {

            console.log(`[SERVICE WORKER]: sending ${data} at ${client.id} with type ${client.type} and url ${client.url}`);

            self.sendTabState(client, data)

            // No need to update the tab that
            // sent the data
            //if (client.id !== clientId) {
            //    self.sendTabState(client, data)
            //}

        })
    })
}

// This function simulate a remote fetch
const getRemoteData = () => {
    console.warn('[SERVICE WORKER]: CALLING REMOTE ENDPOINT')
    setTimeout(() => {
        return new Date().toString();
    }, 3000)
}