import mongoose from "mongoose";
import JunqiGame from "../../models/interfaces/IJunqiGame";

const createRoomToGame = (roomName : string, gameName : string) => {
    const jg = new JunqiGame({
        
    });

    return jg.save();
};

const deleteRoomToGame = (roomName : string) => {
    return;
};

export { createRoomToGame, deleteRoomToGame };