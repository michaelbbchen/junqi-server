import { IJunqiGame, Side } from "./interfaces/IJunqiGame";
import { IBoard } from "./interfaces/IBoard";
import { Position } from "./Position";

export class JunqiGame implements IJunqiGame {
    name: string;
    board: IBoard;
    turn: number;
    started: boolean;
    players: Map<string, string>;
    ready: Map<string, boolean>;
    
    constructor(board: IBoard){
        this.name = "";
        this.board = board;
        this.turn = 0;
        this.started = false;
        this.players = new Map([]);
        this.ready = new Map([]);
    }

    makeMove(pos1: Position, pos2: Position): boolean {
        throw new Error("Method not implemented.");
    }

    swap(pos1: Position, pos2: Position): boolean {
        throw new Error("Method not implemented.");
    }

    surrender(s: Side): void {
        throw new Error("Method not implemented.");
    }

    readyUp(s: Side): void {
        throw new Error("Method not implemented.");
    }
}
