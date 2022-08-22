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


        //player 0
        var a1 = new Tile(new Piece(11 , 0), 1);
        var a2 = new Tile(new Piece(1, 0), 1);
        var a3 = new Tile(new Piece(4, 0), 1);
        var a4 = new Tile(new Piece(2, 0), 1);
        var a5 = new Tile(new Piece(6, 0), 1);
        var a6 = new Tile(new Piece(3, 0), 1);

        var b1 = new Tile(new Piece(0, 0), 3);
        var b2 = new Tile(new Piece(10, 0), 1);
        var b3 = new Tile(new Piece(-1, -1), 2);
        var b4 = new Tile(new Piece(7, 0), 1);
        var b5 = new Tile(new Piece(-1, -1), 2);
        var b6 = new Tile(new Piece(8, 0), 1);

        var c1 = new Tile(new Piece(10, 0), 1);
        var c2 = new Tile(new Piece(10, 0), 1);
        var c3 = new Tile(new Piece(2, 0), 1);
        var c4 = new Tile(new Piece(-1, -1), 2);
        var c5 = new Tile(new Piece(5, 0), 1);
        var c6 = new Tile(new Piece(3, 0), 1);
        
        var d1 = new Tile(new Piece(11, 0), 3);
        var d2 = new Tile(new Piece(10, 0), 1);
        var d3 = new Tile(new Piece(-1, -1), 2);
        var d4 = new Tile(new Piece(7, 0), 1);
        var d5 = new Tile(new Piece(-1, 0), 2);
        var d6 = new Tile(new Piece(8, 0), 1);
        
        var e1 = new Tile(new Piece(4 , 0), 1);
        var e2 = new Tile(new Piece(1, 0), 1);
        var e3 = new Tile(new Piece(5, 0), 1);
        var e4 = new Tile(new Piece(2, 0), 1);
        var e5 = new Tile(new Piece(6, 0), 1);
        var e6 = new Tile(new Piece(3, 0), 1);


        // player 1
        var a7 = new Tile(new Piece(3, 1), 1);
        var a8 = new Tile(new Piece(6, 1), 1);
        var a9 = new Tile(new Piece(2, 1), 1);
        var a10 = new Tile(new Piece(4, 1), 1);
        var a11 = new Tile(new Piece(1, 1), 1);
        var a12 = new Tile(new Piece(11, 1), 1);

        var b7 = new Tile(new Piece(8, 1), 1);
        var b8 = new Tile(new Piece(-1, 1), 2);
        var b9 = new Tile(new Piece(7, 1), 1);
        var b10 = new Tile(new Piece(-1, 1), 2);
        var b11 = new Tile(new Piece(10, 1), 1);
        var b12 = new Tile(new Piece(0, 1), 3);
        
        var c7 = new Tile(new Piece(3, 1), 1);
        var c8 = new Tile(new Piece(5, 1), 1);
        var c9 = new Tile(new Piece(-1, 1), 2);
        var c10 = new Tile(new Piece(2, 1), 1);
        var c11 = new Tile(new Piece(10, 1), 1);
        var c12 = new Tile(new Piece(10, 1), 1);

        var d7 = new Tile(new Piece(8, 1), 1);
        var d8 = new Tile(new Piece(-1, 1), 2);
        var d9 = new Tile(new Piece(7, 1), 1);
        var d10 = new Tile(new Piece(-1, 1), 2);
        var d11 = new Tile(new Piece(10, 1), 1);
        var d12 = new Tile(new Piece(11, 1), 3);
        
        var e7 = new Tile(new Piece(3, 1), 1);
        var e8 = new Tile(new Piece(6, 1), 1);
        var e9 = new Tile(new Piece(2, 1), 1);
        var e10 = new Tile(new Piece(5, 1), 1);
        var e11 = new Tile(new Piece(1, 1), 1);
        var e12 = new Tile(new Piece(4, 1), 1);

        var newBoard =
        [
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
        b1.setRoadNeighbors([a1, c1, b2]);
        b1.setRailRoadNeighbors([]);  
        c1.setRoadNeighbors([b1, d1, c2]);
        c1.setRailRoadNeighbors([]);  
        d1.setRoadNeighbors([c1, e1, d2]);
        d1.setRailRoadNeighbors([]);  
        e1.setRoadNeighbors([d1, e2]);
        e1.setRailRoadNeighbors([]);  


        a2.setRoadNeighbors([ a1, b3 ]);
        a2.setRailRoadNeighbors([a3, b2]);  
        b2.setRoadNeighbors([b1, b3]);
        b2.setRailRoadNeighbors([a2, c2]);  
        c2.setRoadNeighbors([c1, b3, c3, d3]);
        c2.setRailRoadNeighbors([b2, d2]);  
        d2.setRoadNeighbors([d1, d3]);
        d2.setRailRoadNeighbors([c2, e2]);  
        e2.setRoadNeighbors([e1]);
        e2.setRailRoadNeighbors([d2,e3]);  

        
        a3.setRoadNeighbors([ b3 ]);
        a3.setRailRoadNeighbors([a4, a2]);  
        b3.setRoadNeighbors([a4, b4, c4, a3, c3, a2, b2, c2]);
        b3.setRailRoadNeighbors([]);  
        c3.setRoadNeighbors([c4, b3, d3, c2]);
        c3.setRailRoadNeighbors([]);  
        d3.setRoadNeighbors([c4, d4, e4, c3, e3, c2, d2, e2]);
        d3.setRailRoadNeighbors([]);  
        e3.setRoadNeighbors([d3]);
        e3.setRailRoadNeighbors([e4, e2]);  
           

        a4.setRoadNeighbors([b5, b4, b3]);
        a4.setRailRoadNeighbors([a5, a3]);  
        b4.setRoadNeighbors([b5, a4, c4, b3]);
        b4.setRailRoadNeighbors([]);  
        c4.setRoadNeighbors([b5, c5, d5, b4, d4, b3, c3, d3]);
        c4.setRailRoadNeighbors([]);  
        d4.setRoadNeighbors([d5, c4, e4, d3]);
        d4.setRailRoadNeighbors([]);  
        e4.setRoadNeighbors([d5, d4, d3]);
        e4.setRailRoadNeighbors([e5, e3]);  

        
        a5.setRoadNeighbors([b5]);
        a5.setRailRoadNeighbors([a6, a4]);  
        b5.setRoadNeighbors([a6, b6, c6, a5, c5, a4, b4, c4]);
        b5.setRailRoadNeighbors([]);  
        c5.setRoadNeighbors([c6, b5, d5, c3]);
        c5.setRailRoadNeighbors([]);  
        d5.setRoadNeighbors([c6, d6, e6, c5, e5, c4, d4, e4]);
        d5.setRailRoadNeighbors([]);  
        e5.setRoadNeighbors([d5]);
        e5.setRailRoadNeighbors([e6, e4]);  


        a6.setRoadNeighbors([b5]);
        a6.setRailRoadNeighbors([a5, a7, b6]);  
        b6.setRoadNeighbors([b5]);
        b6.setRailRoadNeighbors([a6, c6]);  
        c6.setRoadNeighbors([c5]);
        c6.setRailRoadNeighbors([b6, c7, d6]);  
        d6.setRoadNeighbors([d5]);
        d6.setRailRoadNeighbors([e6, c6]);  
        e6.setRoadNeighbors([d5]);
        e6.setRailRoadNeighbors([e7, e5, d6]); 

        
        a7.setRoadNeighbors([b8]);
        a7.setRailRoadNeighbors([a8, a6, b7]);  
        b7.setRoadNeighbors([b6]);
        b7.setRailRoadNeighbors([a7, c7]);  
        c7.setRoadNeighbors([b8, c8, d8]);
        c7.setRailRoadNeighbors([b7, d7, c6]);  
        d7.setRoadNeighbors([d8]);
        d7.setRailRoadNeighbors([c7, e7]);  
        e7.setRoadNeighbors([d8]);
        e7.setRailRoadNeighbors([e8, e6, d7]); 

        a8.setRoadNeighbors([b8]);
        a8.setRailRoadNeighbors([a9, a7]);  
        b8.setRoadNeighbors([a9, b9, c9, c8, c7, b7, a7, a8]);
        b8.setRailRoadNeighbors([]);  
        c8.setRoadNeighbors([c9, d8, c7, b8]);
        c8.setRailRoadNeighbors([]);  
        d8.setRoadNeighbors([c9, d9, e9, e8, e7, d7, c7, c8]);
        d8.setRailRoadNeighbors([]);  
        e8.setRoadNeighbors([d8]);
        e8.setRailRoadNeighbors([e9, e7]); 

        a9.setRoadNeighbors([b10, b9, b8]);
        a9.setRailRoadNeighbors([a10, a8]);  
        b9.setRoadNeighbors([b10, a9, c9, b8]);
        b9.setRailRoadNeighbors([]);  
        c9.setRoadNeighbors([b10, c10, d10, d9, d8, c8, b8, b9]);
        c9.setRailRoadNeighbors([]);  
        d9.setRoadNeighbors([d10, d8, c9, e9]);
        d9.setRailRoadNeighbors([]);  
        e9.setRoadNeighbors([d10, d9, d8]);
        e9.setRailRoadNeighbors([e10, e8]); 

        a10.setRoadNeighbors([b10]);
        a10.setRailRoadNeighbors([a11, a9]);  
        b10.setRoadNeighbors([a11, b11, c11, c10, c9, b9, a9, a10]);
        b10.setRailRoadNeighbors([]);  
        c10.setRoadNeighbors([c11, c9, b10, d10]);
        c10.setRailRoadNeighbors([]);  
        d10.setRoadNeighbors([c11, d11, e11, e10, e9, d9, c9, c10]);
        d10.setRailRoadNeighbors([]);  
        e10.setRoadNeighbors([d10]);
        e10.setRailRoadNeighbors([e11, e9]); 
        
        a11.setRoadNeighbors([a12, a10, b10]);
        a11.setRailRoadNeighbors([a10, b11]);  
        b11.setRoadNeighbors([b12, b10]);
        b11.setRailRoadNeighbors([a11, c11]);  
        c11.setRoadNeighbors([b10, d10]);
        c11.setRailRoadNeighbors([b11, d11]);  
        d11.setRoadNeighbors([d12, d10]);
        d11.setRailRoadNeighbors([c11, e11]);  
        e11.setRoadNeighbors([d10, e12]);
        e11.setRailRoadNeighbors([d11, e10]); 

        a12.setRoadNeighbors([a11, b12]);
        a12.setRailRoadNeighbors([]);  
        b12.setRoadNeighbors([a12, c12, b11]);
        b12.setRailRoadNeighbors([]);  
        c12.setRoadNeighbors([b12, d12, c11]);
        c12.setRailRoadNeighbors([]);  
        d12.setRoadNeighbors([c12, e12, d11]);
        d12.setRailRoadNeighbors([]);  
        e12.setRoadNeighbors([d12, e11]);
        e12.setRailRoadNeighbors([]); 
        
        



        return newBoard;
    }



}

