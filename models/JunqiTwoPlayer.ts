import { IJunqiGame } from "./interfaces/IJunqiGame";
import { IBoard } from "./interfaces/IBoard";

export class JunqiTwoPlayer implements IJunqiGame {
    name: string;
    board: IBoard;
    turn: number;
    started: boolean;
    ready: Map<string, boolean>;
    
    constructor(board: IBoard){

        //this.piecesBoard = [ [],[],[],[],[] ]
        this.name = "";
        this.board = board;
        this.turn = 0;
        this.started = false;
        this.ready = new Map([])
        
    }


    // makeMove(){
    //     this.board.checkLegalMove(move)
        
    //     this.board.move();

        
        
    // }


    getBoard(){//return state of board for backend to send to front end
        this.board.getState();
        //format piecesBoard 
    }


}
