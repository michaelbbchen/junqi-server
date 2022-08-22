import mongoose from "mongoose";
import JunqiGame from "../../models/interfaces/IJunqiGame";
import { JunqiBoard } from "../../models/JunqiBoard";

const createJunqiGame = (roomName : string, connectedSockets : Set<string>) => {
    console.log(`Creating JunqiGame: ${roomName} in db`);

    const jb = new JunqiBoard(roomName);

    const jg = new JunqiGame({
        name : roomName,
        board : jb,
        turn : 0,
        started : false,
        players : new Map([]),
        ready : new Map([]),
    });
    connectedSockets.forEach((s) => jg.ready.set(s, false));
    connectedSockets.forEach((s) => jg.players.set(s, s));

    return jg.save();
};

const deletePlayerFromJunqiGame = async (playerName : string) => {
    try{
        console.log(`Deleting player ${playerName} from JunqiGame`);
        //const game = await JunqiGame.find({ name :  });
        //console.log(game);
        
    } catch(e) {

    }

};

const deleteJunqiGame = (playerName : string) => {
    console.log(`Deleting JunqiGame with player ${playerName} in db`);
    return JunqiGame.deleteMany({ players: playerName });
};

export { createJunqiGame, deletePlayerFromJunqiGame, deleteJunqiGame };