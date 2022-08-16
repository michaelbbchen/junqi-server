import { Server } from "socket.io"
import { useSocketServer } from "socket.io-ts-controllers";

export default (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        },
    });

    useSocketServer(io, {controllers: [__dirname + "/api/controllers/*.ts"] })

    return io;
}