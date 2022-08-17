import internal from "stream";
import { IBoard } from "./interfaces/IBoard";
import { Piece } from "./Piece";
import { Tile } from "./tile";

export class JunqiBoard implements IBoard {

    board: Tile[][];


    constructor(){
        this.board = this.getNewBoard();
    }
    

    getState(): void {
        throw new Error("Method not implemented.");
    }

    private getNewBoard(): Tile[][]{
        //new Tile(new Piece(pieceType, player), tileType)

        var a1 = new Tile(new Piece( , 0), 1);



        var newBoard =
        [ [a13, b13, c13, d13, e13 ],
          [a12, b12, c12, d12, e12 ],
          [a11, b11, c11, d11, e11 ],
          [a10, b10, c10, d10, e10 ],
          [a9, b9, c9, d9, e9 ],
          [a8, b8, c8, d8, e8 ],
          [a7, b7, c7, d7, e7 ],
          [a6, b6, c6, d6, e6 ],
          [a5, b5, c5, d5, e5 ],
          [a4, b4, c4, d4, e4 ],
          [a3, b3, c3, d3, e3 ],
          [a2, b2, c2, d2, e2 ],
          [a1, b1, c1, d1, e1 ] ];
        
          
        a1.setRoadNeighbors([ a2, b1 ]);
        a1.setRailRoadNeighbors([]);  



        return newBoard;
    }



}

