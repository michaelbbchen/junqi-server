import { IJunqiGame } from "./interfaces/IJunqiBoard";
import { IBoard } from "./interfaces/IBoard";

export class Junqi2Player implements IJunqiGame {
    board: IBoard;
    turn: number;
    started: boolean;
    ready: boolean[];
    
    constructor(board: IBoard){

        //this.piecesBoard = [ [],[],[],[],[] ]
        this.board = board;
        this.turn = 0;
        this.started = false;
        this.ready = [false, false];
        
    }


    getBoard(){//return state of board for backend to send to front end
        //format piecesBoard 
    }


}
