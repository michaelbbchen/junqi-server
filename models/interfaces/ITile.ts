import { IPiece } from "./IPiece";

export interface ITile {
    piece: IPiece;
    getPiece(): IPiece;
}