import { TileType } from "../Tile";
import { IPiece } from "./IPiece";

export interface ITile {
    piece: IPiece;
    setPiece(piece: IPiece): void;
    getPiece(): IPiece;

    getTileType(): TileType;
}