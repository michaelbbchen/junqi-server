import { SocketController } from "socket-controllers";
import { Socket, Server } from "socket.io";
import { ConnectedSocket, OnConnect, SocketIO } from "socket-controllers";

@SocketController()
class MainController {
    @OnConnect()
    public onConnection(@ConnectedSocket() socket : Socket, @SocketIO() io : Server) {
        console.log("New Socket connected: ", socket.id);
    }
}