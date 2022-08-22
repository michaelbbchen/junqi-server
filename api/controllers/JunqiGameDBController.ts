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
        players : [],
        ready : new Map([]),
    });
    connectedSockets.forEach((s) => jg.ready.set(s, false));
    connectedSockets.forEach((s) => jg.players.push(s));

    return jg.save();
};

const deletePlayerFromJunqiGame = async (playerName : string) => {
    try{
        console.log(`Deleting player ${playerName} from JunqiGame`);
        const game = await JunqiGame.find({ players : playerName });
        for (let i = 0; i < 2; i++) {
            if (game[0].players[i] === playerName) {
                game[0].players[i] = "";
                await game[0].save();
            }
        }
        if (game[0].players[0] === "" && game[0].players[1] === ""){
            deleteJunqiGame(game[0].name);
        }
        //console.log(game);
        
        
    } catch(e) {
        console.log(e);
    }

};

const deleteJunqiGame = async (gameName : string) => {
    console.log(`Deleting JunqiGame ${gameName} in db`);
    return JunqiGame.deleteMany({ name: gameName });
};

export { createJunqiGame, deletePlayerFromJunqiGame, deleteJunqiGame };