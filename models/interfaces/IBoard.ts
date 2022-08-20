import { IPiece } from "./IPiece";
import { ITile } from "./ITile";
import { Position } from "../Position";

export interface IBoard{
    board: ITile[][];

    setTileAt(pos: Position, tile: ITile): void;
    getTileAt(pos: Position): ITile;

    isLegalMove(pos1: Position, pos2: Position): boolean;
    makeMove(pos1: Position, pos2: Position): void;
    swap(pos1: Position, pos2: Position): void;

    hasPiece(pos1: Position): boolean;
    isGameOver(): boolean;
}
