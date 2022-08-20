import { IJunqiGame, Side } from "./interfaces/IJunqiGame";
import { IBoard } from "./interfaces/IBoard";
import { Position } from "./Position";

export class JunqiGame implements IJunqiGame {
    board: IBoard;
    turn: number;
    started: boolean;
    ready: boolean[];
    
    constructor(board: IBoard){
        this.board = board;
        this.turn = 0;
        this.started = false;
        this.ready = [false, false];
    }

    makeMove(pos1: Position, pos2: Position): boolean {
        throw new Error("Method not implemented.");
    }

    swap(pos1: Position, pos2: Position): void {
        throw new Error("Method not implemented.");
    }

    surrender(s: Side): void {
        throw new Error("Method not implemented.");
    }

    readyUp(s: Side): void {
        throw new Error("Method not implemented.");
    }
}
