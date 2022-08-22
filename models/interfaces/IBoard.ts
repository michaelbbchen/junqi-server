import { IPiece } from "./IPiece";
import { ITile } from "./ITile";
import { Position } from "../Position";

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
