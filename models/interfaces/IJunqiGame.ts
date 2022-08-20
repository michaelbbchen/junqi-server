//import { Piece } from "../Piece";
import { Position } from "../Position";
import { IBoard } from "./IBoard";

export interface IJunqiGame{
    board: IBoard;
    turn: number;
    started: boolean;
    ready: boolean[]

    // makeMove will return true or false depending on whether or not the was successfully made
    makeMove(pos1: Position, pos2: Position): boolean;
    swap(pos1: Position, pos2: Position): void;
    surrender(s: Side) : void;
    readyUp(s: Side): void;
}

export enum Side {
    Neither,
    Blue,
    Red
}