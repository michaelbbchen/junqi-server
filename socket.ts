import { Server } from "socket.io"
import { useSocketServer } from 'socket-controllers';

export default (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        },
        serveClient: true
    });

    console.log(__dirname + "/api/controllers/*.ts")
    useSocketServer(io, {controllers: [__dirname + "/api/controllers/mainController.js"] })

    return io;
}