import { Piece } from "../piece";
import { IBoard } from "./IBoard";

export interface IJunqiGame{
    board: IBoard;
    turn: number;
    started: boolean;
    ready: boolean[]
    getBoard(): void;
    
}