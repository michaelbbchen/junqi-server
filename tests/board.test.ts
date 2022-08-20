import { JunqiBoard } from "../models/JunqiBoard";
import { Piece } from "../models/Piece";
import { Position } from "../models/Position";
import { Tile } from "../models/Tile";

describe('board initalization works', function () {
    it('initalize new JunqiBoard', () => {
        new JunqiBoard();
    });

    it('initalize and check some pieces', () => {
        const testBoard = new JunqiBoard();
        expect(testBoard.getTileAt(new Position(1, 1)).getPiece()).toStrictEqual(new Piece(10, 1));
    })
})