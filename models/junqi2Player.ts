import { IJunqiGame } from "./interfaces/IJunqiGame";
import { IBoard } from "./interfaces/IBoard";

export class Junqi2Player implements IJunqiGame {
    board: IBoard;
    turn: number;
    started: boolean;
    ready: Map<string, boolean>;
    
    constructor(board: IBoard){

        //this.piecesBoard = [ [],[],[],[],[] ]
        this.board = board;
        this.turn = 0;
        this.started = false;
        this.ready = new Map([])
        
    }


    getBoard(){//return state of board for backend to send to front end
        //format piecesBoard 
    }


}
