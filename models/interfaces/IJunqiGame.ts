//import { Piece } from "../Piece";
import { IBoard } from "./IBoard";

export interface IJunqiGame{
    board: IBoard;
    turn: number;
    started: boolean;
    ready: boolean[]
    getBoard(): void;//TODO figure out return time later
    
}