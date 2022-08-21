import { Side } from "../models/interfaces/IJunqiGame";
import { Rank } from "../models/interfaces/IPiece";
import { JunqiBoard } from "../models/JunqiBoard";
import { Piece } from "../models/Piece";
import { Position } from "../models/Position";
import { Tile, TileType } from "../models/Tile";

describe('board', () => {
    it('can be initalized without error', () => {
        new JunqiBoard();
    });

    it('initally has pieces in the correct places', () => {
        const testBoard = new JunqiBoard();
        expect(testBoard.getPieceAt(new Position(1, 1))).toStrictEqual(new Piece(Rank.Landmine, Side.Red));
        expect(testBoard.getPieceAt(new Position(3, 4))).toStrictEqual(new Piece(Rank.Lieutenant, Side.Red));
        expect(testBoard.getPieceAt(new Position(9, 2))).toStrictEqual(new Piece(Rank.Lieutenant, Side.Blue));
    })

    it('has same number of tiles on both sides', () => {
        const testBoard = new JunqiBoard();
        let redCount = 0;
        let blueCount = 0;
        let emptyCount = 0;
        for(let i = 0; i < testBoard.board.length; i++) {
            for(let j = 0; j <testBoard.board[i].length; j++) {
                if(testBoard.getPieceAt(new Position(i, j)).player == Side.Blue) blueCount++;
                else if(testBoard.getPieceAt(new Position(i, j)).player == Side.Red) redCount++;
                else emptyCount++;
            }
        }

        expect(emptyCount).toBe(10);
        expect(redCount).toBe(25);
        expect(blueCount).toBe(25);
    })

    it("throws error on invalid getTileAt position", () => {
        const testBoard = new JunqiBoard();
        expect(() => {testBoard.getPieceAt(new Position(-1, -1))}).toThrowError("Position given is not on board!")
        expect(() => {testBoard.getPieceAt(new Position(-1, 5))}).toThrowError("Position given is not on board!")
        expect(() => {testBoard.getPieceAt(new Position(2, -1))}).toThrowError("Position given is not on board!")
        expect(() => {testBoard.getPieceAt(new Position(29, 2))}).toThrowError("Position given is not on board!")
    }) 

    it("throws error on invalid setTileAt position", () => {
        const testBoard = new JunqiBoard();
        expect(() => {testBoard.setPieceAt(new Position(-1, -1), new Piece(Rank.Bomb, Side.Blue))}).toThrowError("Position given is not on board!");
        expect(() => {testBoard.setPieceAt(new Position(-5, 4), new Piece(Rank.Bomb, Side.Blue))}).toThrowError("Position given is not on board!");
        expect(() => {testBoard.setPieceAt(new Position(24, 502), new Piece(Rank.Bomb, Side.Blue))}).toThrowError("Position given is not on board!");
        expect(() => {testBoard.setPieceAt(new Position(2, -1), new Piece(Rank.Bomb, Side.Blue))}).toThrowError("Position given is not on board!");
    })

    it("correctly sets and gets tiles", () => {
        const testBoard = new JunqiBoard();
        expect(testBoard.getPieceAt(new Position(3, 4))).toStrictEqual(new Piece(Rank.Lieutenant, Side.Red));
        testBoard.setPieceAt(new Position(3, 4), new Piece(Rank.Bomb, Side.Red));
        expect(testBoard.getPieceAt(new Position(3, 4))).toStrictEqual(new Piece(Rank.Bomb, Side.Red));
    })

    it("recognizies invalid swaps", () => {
        const testBoard = new JunqiBoard();
        expect(testBoard.getPieceAt(new Position(3, 4))).toStrictEqual(new Piece(Rank.Lieutenant, Side.Red));
        expect(testBoard.getPieceAt(new Position(1, 1))).toStrictEqual(new Piece(Rank.Lieutenant, Side.Blue));
        expect(testBoard.isLegalSwap(new Position(3, 4), new Position(1, 1))).toBe(false);
    })

})