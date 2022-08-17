import { IJunqiGame } from "./interfaces/IJunqiGame";
import { IBoard } from "./interfaces/IBoard";

export class JunqiTwoPlayer implements IJunqiGame {
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


    // makeMove(){
    //     this.board.checkLegalMove(move)
        
    //     this.board.move();

        
        
    // }


    getBoard(){//return state of board for backend to send to front end
        this.board.getState();
        //format piecesBoard 
    }


}
