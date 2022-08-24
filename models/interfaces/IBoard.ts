import { IPiece } from "./IPiece";
import { ITile, ITileSchema } from "./ITile";
import { Position } from "../Position";
import { Schema } from "mongoose";
import { Side } from "./IJunqiGame";

export interface IBoard{
    board: ITile[][];
    winner: Side;
    revealFlagArr: boolean [];

    setPieceAt(pos: Position, piece: IPiece): void;
    getPieceAt(pos: Position): IPiece;

    isLegalMove(pos1: Position, pos2: Position): boolean;
    makeMove(pos1: Position, pos2: Position): boolean;

    isLegalSwap(pos1: Position, pos2: Position): boolean;
    swap(pos1: Position, pos2: Position): boolean;

    hasPiece(pos1: Position): boolean;
    hasWinner(): Side;
    revealFlags(): boolean [];
}

export const IBoardSchema : Schema = new Schema({
    board: { type: [[ITileSchema]], required : true}
})
