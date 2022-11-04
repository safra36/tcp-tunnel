import { createServer } from "http";
import * as socket from "net";




const config = {
    listenPort : 8001,
    connectPort : 8000,
    connectAddress : "localhost"
}

const localServer = socket.createServer().listen(config.listenPort);

localServer.on("connection", (localSocket) => {

    console.log(`new connection to local server.`);

    const remoteServer = socket.createConnection({
        'host' : config.connectAddress,
        'port' : config.connectPort
    })

    remoteServer.on("connect", () => {
        console.log(`Connected to remote server.`);
    })

    localSocket.on("connect", () => {
        console.log(`Connection to local server established.`);
    })

    remoteServer.on("data", (data : Buffer) => {
        console.log(`Reading Remote <--> Wrting Local`);
        localSocket.write(data);
    })


    localSocket.on("data", (data : Buffer) => {
        console.log(`Reading Local <--> Wrting Remote`);
        remoteServer.write(data);
    })
    
})