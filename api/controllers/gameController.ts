import { SocketController, SocketIO, OnMessage, MessageBody, ConnectedSocket } from "socket-controllers"; 
import { Server, Socket } from "socket.io";
import { deleteRoomToGame } from "./roomToGameDBController";

@SocketController()
export class GameController {
    private getSocketGameRoom(socket: Socket): string {
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r != socket.id);
        const gameRoom = socketRooms && socketRooms[0];
        
        return gameRoom
    }
    @OnMessage("ready_up")
    public async readyUp(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        const gameRoom = this.getSocketGameRoom(socket);
        //socket.to(gameRoom).emit("ready_up_response", { sid : socket.id });
        deleteRoomToGame(gameRoom);
        socket.emit("ready_up_response", { state : true })
    }
    @OnMessage("update_game")
    public async updateGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit("on_game_update", message);
    }
}