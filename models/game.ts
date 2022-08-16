import { Piece } from "./piece";
import { Board } from "./board";

export interface JunqiGame{
    piecesBoard: Piece[][];


    
    board: Board;
    turn: number;
    started: boolean;
    ready: boolean[]
    getBoard(): Piece[][];
}

export class Junqi2Player implements JunqiGame {
    piecesBoard: Piece[][];
    board: Board;
    turn: number;
    started: boolean;
    ready: boolean[];


    constructor(board: Board){

        this.piecesBoard = [ [],[],[],[],[] ]
        this.board = board;
        this.turn = 0;
        this.started = false;
        this.ready = [false, false];
        
    }


    getBoard(): Piece[][] {//return state of board for backend to send to front end
        return this.piecesBoard;//format piecesBoard 
    }


}
