import mongoose from "mongoose";
import RoomToGame from "../../models/interfaces/IRoomToGame";

const createRoomToGame = (roomName : string, gameName : string) => {
    const rtg = new RoomToGame({
        _id : new mongoose.Types.ObjectId(),
        roomname : roomName,
        gamename : gameName
    });

    return rtg.save()
};

const deleteRoomToGame = (roomName : string) => {
    return RoomToGame.deleteOne({ roomname : roomName })
};

export { createRoomToGame, deleteRoomToGame };