import mongoose from "mongoose";
import JunqiGame from "../../models/interfaces/IJunqiGame";
import { JunqiBoard } from "../../models/JunqiBoard";

const createJunqiGame = (roomName : string) => {
    console.log(`Creating JunqiGame: ${roomName} in db`)

    const jb = new JunqiBoard(roomName);

    const jg = new JunqiGame({
        name : roomName,
        board : jb,
        turn : 0,
        started : false,
        ready : new Map([]),
    });

    return jg.save();
};

const deleteRoomToGame = (roomName : string) => {
    return;
};

export { createJunqiGame, deleteRoomToGame };