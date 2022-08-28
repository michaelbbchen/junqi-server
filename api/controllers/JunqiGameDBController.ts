import mongoose from "mongoose";
import { IBoard } from "../../models/interfaces/IBoard";
import JunqiGame from "../../models/interfaces/IJunqiGame";
import { JunqiBoard } from "../../models/JunqiBoard";

const createJunqiGame = (roomName : string, connectedSockets : Set<string>) => {
    console.log(`Creating JunqiGame: ${roomName} in db`);

    const jb = new JunqiBoard();

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

const hasJunqiGame = (gameName : string) => {
    console.log(JunqiGame.exists({name : gameName}));
    return JunqiGame.exists({name : gameName});
}
const updateJunqiGame = async (board : IBoard, gameName : string) => {
    if (await JunqiGame.exists({ name : gameName})) {
        console.log(`Updating game ${gameName}`);
        JunqiGame.updateOne({name : gameName}, { board : board });
    } else {
        console.log(`Game ${gameName} does not exist`)
    }
    return;
}

const setReadyJunqiGame = async (playerName : string, gameName : string, state : boolean) => {
    if (await JunqiGame.exists({ name : gameName})) {
        console.log(`Readying player: ${playerName} in JunqiGame: ${gameName}`);
        const game = await JunqiGame.find({ name : gameName });
        if (game[0].players.includes(playerName)){
            game[0].ready.set(playerName, state);
        }
        game[0].save();
    } else {
        console.log(`Game ${gameName} does not exist`)
    }
}

const startJunqiGame = async (gameName : string) => {
    if (await JunqiGame.exists({ name : gameName})) {
        console.log(`Starting JunqiGame: ${gameName}`);
        const game = await JunqiGame.find({ name : gameName });
        
        game[0].started = true;
        game[0].save();
    } else {
        console.log(`Game ${gameName} does not exist`);
    }
}

const addPlayerToJunqiGame = async (playerName : string, gameName : string) => {
    if (await JunqiGame.exists({ name : gameName})) {
        console.log(`Starting JunqiGame: ${gameName}`);
        const game = await JunqiGame.find({ name : gameName });
        for (let i = 0; i < 2; i++) {
            if (game[0].players[i] === "") {
                game[0].players[i] = playerName;
                await game[0].save();
                return;
            }
        }
        console.log(`Game ${gameName} is full`);
    } else {
        console.log(`Game ${gameName} does not exist`);
    }
    return;
}

const deletePlayerFromJunqiGame = async (playerName : string) => {
    try{
        console.log(`Deleting player ${playerName} from JunqiGame`);
        const game = await JunqiGame.find({ players : playerName });
        /*
        for (let i = 0; i < 2; i++) {
            if (game[0].players[i] === playerName) {
                game[0].players[i] = "";
                await game[0].save();
            }
        }
        */
        var ind = game[0].players.indexOf(playerName);
        if (ind !== -1) {
            game[0].players[ind] = "";
            await game[0].save();
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
    return JunqiGame.deleteOne({ name: gameName });
};

export { createJunqiGame, setReadyJunqiGame, hasJunqiGame, addPlayerToJunqiGame, startJunqiGame, updateJunqiGame, deletePlayerFromJunqiGame, deleteJunqiGame };