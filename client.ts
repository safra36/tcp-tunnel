import * as socket from "net";




const config = {
    listenPort : 8080,
    serverPort : 8000,
    serverAddress : "localhost"
}


const localServer = socket.createServer().listen(config.listenPort);


localServer.on("connection", (localSocket) => {

    console.log(`new connection to local server.`);

    const remoteServer = socket.createConnection({
        'host' : config.serverAddress,
        'port' : config.serverPort
    })

    const local = `LOCAL`;
    const remote = `REMOTE`;

    remoteServer.on("connect", () => {
        console.log(`Connected to remote server.`);
    })

    localSocket.on("connect", () => {
        console.log(`Connection to ${local} established.`);
    })

    remoteServer.on("data", (data : Buffer) => {
        console.log(`Reading ${remote} <--> Wrting ${local}`);
        localSocket.write(data);
    })

    localSocket.on("data", (data : Buffer) => {
        console.log(`Reading ${local} <--> Wrting ${remote}`);
        remoteServer.write(data);
    })

    remoteServer.on("error", (error) => {
        console.log(`${remote} Error, ${error}`);
    })

    localSocket.on("error", (error) => {
        console.log(`${local} Error, ${error}`);
    })

    remoteServer.on("end", () => {
        console.log(`${remote} Ended.`);
    })

    localSocket.on("end", () => {
        console.log(`${local} Ended`);
    })

})




