import { Piece } from "../Piece";
import { Tile } from "../Tile";

export interface IBoard{
    board: Tile[][],

    setBoard(board: Tile[][]): void;
    swap(x1: number, y1: number, x2: number, y2: number): void;
    makeMove(x1: number, y1: number, x2: number, y2: number): void;
    isLegalMove(x1: number, y1: number, x2: number, y2: number): boolean;
    hasPiece(x: number, y: number): boolean;
    pieceWinner(p1: Piece, p2: Piece): Piece;
    isGameOver(): boolean;


    getState(): Tile[][];//TODO: determine return type  TILE[][] TEMPERARY RETURN TYPE
}
