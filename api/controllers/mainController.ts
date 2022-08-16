import { SocketController } from "socket-controllers";
import { Socket, Server } from "socket.io";
import { ConnectedSocket, OnConnect, SocketIO } from "socket-controllers";

@SocketController()
export class MainController {
    @OnConnect()
    public onConnection(
        @ConnectedSocket() socket: Socket,
        @SocketIO() server: Server) {
            console.log(`Socket Connected: ${socket.id}`);
    }
}