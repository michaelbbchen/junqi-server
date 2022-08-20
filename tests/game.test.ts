import { Side } from "../models/interfaces/IJunqiGame";
import { Rank } from "../models/interfaces/IPiece";
import { JunqiBoard } from "../models/JunqiBoard";
import { Piece } from "../models/Piece";
import { Position } from "../models/Position";
import { Tile } from "../models/Tile";

describe('board', () => {
    it('can be initalized without error', () => {
        new JunqiBoard();
    });

    it('initally has pieces in the correct places', () => {
        const testBoard = new JunqiBoard();
        expect(testBoard.getTileAt(new Position(1, 1)).getPiece()).toStrictEqual(new Piece(Rank.Landmine, Side.Blue));
        expect(testBoard.getTileAt(new Position(3, 4)).getPiece()).toStrictEqual(new Piece(Rank.Lieutenant, Side.Blue));
        expect(testBoard.getTileAt(new Position(9, 2)).getPiece()).toStrictEqual(new Piece(Rank.Lieutenant, Side.Red));
    })
})