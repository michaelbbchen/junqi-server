import { IPiece } from "./IPiece";
import { ITile, ITileSchema } from "./ITile";
import { Position } from "../Position";
import { Schema } from "mongoose";

export interface IBoard{
    board: ITile[][];

    setPieceAt(pos: Position, piece: IPiece): void;
    getPieceAt(pos: Position): IPiece;

    isLegalMove(pos1: Position, pos2: Position): boolean;
    makeMove(pos1: Position, pos2: Position): void;

    isLegalSwap(pos1: Position, pos2: Position): boolean;
    swap(pos1: Position, pos2: Position): void;

    hasPiece(pos1: Position): boolean;
    isGameOver(): boolean;
}

export const IBoardSchema : Schema = new Schema({
    board: { type: [[ITileSchema]], required : true}
})
