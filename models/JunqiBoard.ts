import { PipelineTopicExpression } from "@babel/types";
import { exit } from "process";
import internal from "stream";
import { runInThisContext } from "vm";
import { threadId } from "worker_threads";
import { IBoard } from "./interfaces/IBoard";
import { Side } from "./interfaces/IJunqiGame";
import { IPiece, Rank } from "./interfaces/IPiece";
import { ITile } from "./interfaces/ITile";
import { Piece} from "./Piece";
import { Position } from "./Position";
import { Tile, TileType } from "./Tile";

export class JunqiBoard implements IBoard {
    board: ITile[][];

    constructor(boardString: string = ""){
        if(!boardString) this.board = this.defineNewBoard("BFLB4 1LLL1 4?2?5 27?72 6?5?6 38393 38393 6?5?6 27?72 4?2?5 1LLL1 BFLB4");
        else {
            // TODO: initalize board based on what the boardString says
            this.board = this.defineNewBoard(boardString);
        }
    }

    isLegalSwap(pos1: Position, pos2: Position): boolean {
        if(!this.validPosition(pos1)) throw new Error("Position1 given is not on board!");
        if(!this.validPosition(pos2)) throw new Error("Position2 given is not on board!");

        let piece1 = this.getPieceAt(pos1);
        let piece2 = this.getPieceAt(pos2);

        if(piece1.player === Side.Red && piece2.player === Side.Blue){
            return false;
        } else if(piece1.player === Side.Blue && piece2.player === Side.Red){
            return false;
        }

        if(piece1.player === Side.Red){

            if(piece1.rank === Rank.Flag){
                return pos2.row === 0 && (pos2.col === 1 || pos2.col === 3);
            } else if(piece2.rank === Rank.Flag){
                return pos1.row === 0 && (pos1.col === 1 || pos1.col === 3);
            }

            if(piece1.rank === Rank.Landmine){
                return pos2.row == 0 || pos2.row == 1;
            } else if(piece2.rank === Rank.Landmine){
                return pos1.row == 0 || pos1.row == 1;
            } 

            if(piece1.rank === Rank.Bomb){
                return pos2.row !== 5;
            }
            else if(piece2.rank === Rank.Bomb){
                return pos1.row !== 5;
            }
            
        } else if(piece1.player === Side.Blue){


            if(piece1.rank === Rank.Flag){
                return pos2.row === 11 && (pos2.col === 1 || pos2.col === 3);
            } else if(piece2.rank === Rank.Flag){
                return pos1.row === 11 && (pos1.col === 1 || pos1.col === 3);
            }

            if(piece1.rank === Rank.Landmine){
                return pos2.row == 10 || pos2.row == 11;
            } else if(piece2.rank === Rank.Landmine){
                return pos1.row == 10 || pos1.row == 11;
            } 

            if(piece1.rank === Rank.Bomb){
                return pos2.row !== 6;
            }
            else if(piece2.rank === Rank.Bomb){
                return pos1.row !== 6;
            }

        }

        return true;
    }

    private validPosition(pos: Position) {
        if(pos.row < 0 || pos.row > this.board.length) return false;
        if(pos.col < 0 || pos.col > this.board[pos.row].length) return false;
        return true;
    }

    setPieceAt(pos: Position, piece: IPiece): void {
        if(!this.validPosition(pos)) throw new Error("Position given is not on board!");
        this.board[pos.row][pos.col].setPiece(piece);
    }

    getPieceAt(pos: Position): IPiece {
        // warning: could allow for mutation?
        if(!this.validPosition(pos)) throw new Error("Position given is not on board!");
        return this.board[pos.row][pos.col].getPiece();
    }

    isLegalMove(pos1: Position, pos2: Position): boolean {
        if(!this.validPosition(pos1)) return  false;
        if(!this.validPosition(pos2)) return false;

        let pieceMoved = this.getPieceAt(pos1);

        if(pieceMoved.rank === Rank.Empty) return false;
        if(pieceMoved.rank === Rank.Flag) return false;
        if(pieceMoved.rank === Rank.Landmine) return false;

        if(pieceMoved.player === Side.Blue && this.getPieceAt(pos2).player === Side.Blue) return false;
        if(pieceMoved.player === Side.Red && this.getPieceAt(pos2).player === Side.Red) return false;


        let startingTile = this.board[pos1.row][pos1.col];



        if(pieceMoved.rank === Rank.Engineer){

        } else {
            
            let startingTile = this.board[pos1.row][pos1.col];

        }


        return false;

    }

    makeMove(pos1: Position, pos2: Position): boolean {
        if(!this.isLegalMove(pos1, pos2)) return false;
        

        if(!this.hasPiece(pos2)){
            this.swap(pos1, pos2);
            
        } 

        return true;

    }

    swap(pos1: Position, pos2: Position): boolean {
        if(!this.isLegalSwap(pos1, pos2)) return false;

        let temp = this.getPieceAt(pos1);

        this.setPieceAt(pos1, this.getPieceAt(pos2));
        this.setPieceAt(pos2, temp);

        return true;
    }

    hasPiece(pos1: Position): boolean {
        if (!this.validPosition(pos1)) throw new Error("Invalid Position");

        return this.getPieceAt(pos1).rank >= 0
    }

    isGameOver(): boolean {
        throw new Error("Method not implemented.");
    }
    
    testMethod(){
        // let temp = this.board[0][1].getRoad;

    }



    private defineNewBoard(pieces: String): ITile[][] {

        // let newBoard = Array<Array<ITile>>;
        let newBoard: ITile[][] = [[],[],[],[],[], [], [], [], [], [], [], []]
        let tilesArr = [TileType.Post, TileType.HQ, TileType.Post, TileType.HQ, TileType.Post,
                       TileType.Post, TileType.Post, TileType.Post, TileType.Post, TileType.Post,
                       TileType.Post, TileType.Campsite, TileType.Post, TileType.Campsite, TileType.Post,
                       TileType.Post, TileType.Post, TileType.Campsite, TileType.Post, TileType.Post,
                       TileType.Post, TileType.Campsite, TileType.Post, TileType.Campsite, TileType.Post,
                       TileType.Post, TileType.Post, TileType.Post, TileType.Post, TileType.Post, 
                       TileType.Post, TileType.Post, TileType.Post, TileType.Post, TileType.Post, 
                       TileType.Post, TileType.Post, TileType.Post, TileType.Post, TileType.Post,
                       TileType.Post, TileType.Campsite, TileType.Post, TileType.Campsite, TileType.Post,
                       TileType.Post, TileType.Post, TileType.Campsite, TileType.Post, TileType.Post,
                       TileType.Post, TileType.Campsite, TileType.Post, TileType.Campsite, TileType.Post,
                       TileType.Post, TileType.HQ, TileType.Post, TileType.HQ, TileType.Post]

        let piecesArr = [];
        let dict: any = { "1": Rank.Engineer, "2": Rank.Lieutenant, "3": Rank.Captain, "4": Rank.Major, "5": Rank.Colonel, 
                    "6": Rank.BrigadierGeneral, "7": Rank.MajorGeneral, "8": Rank.Bomb, "9": Rank.FieldMarshal, 
                    "B": Rank.Bomb, "F": Rank.Flag, "?": Rank.Empty, "L": Rank.Landmine, }

         
        let side = Side.Red;

        for(let i = 0; i < pieces.length; i++){


            if(i === 30){
                side = Side.Blue;
            }

            let currChar = pieces[i];
            
            if(currChar === " "){
                continue;
            }

            if(!dict.hasOwnProperty(currChar)){
                throw new Error("Invalid Input String: Incorrect Format")
            }

            piecesArr.push(new Piece(dict[currChar], side));

        }
        
        let n = 0;
        for(let i = 0; i < newBoard.length; i++){

            if(n >= 60){
                throw new Error("Invalid Input String: Incorrect Format");
            }

            for(let j = 0; j < 5; j++){
                newBoard[i].push(new Tile(piecesArr[n], tilesArr[n]));
                n++;
            }
        }


        newBoard[11][0].setRoadNeighbors([ newBoard[10][0], newBoard[11][1] ]);
        newBoard[11][0].setRailroadNeighbors([]);  
        newBoard[11][1].setRoadNeighbors([newBoard[11][0], newBoard[11][2], newBoard[11][1]]);
        newBoard[11][1].setRailroadNeighbors([]);  
        newBoard[11][2].setRoadNeighbors([newBoard[11][1], newBoard[11][3], newBoard[10][2]]);
        newBoard[11][2].setRailroadNeighbors([]);  
        newBoard[11][3].setRoadNeighbors([newBoard[11][2], newBoard[11][4], newBoard[10][3]]);
        newBoard[11][3].setRailroadNeighbors([]);  
        newBoard[11][4].setRoadNeighbors([newBoard[11][3], newBoard[10][4]]);
        newBoard[11][4].setRailroadNeighbors([]);  


        newBoard[10][0].setRoadNeighbors([ newBoard[11][0], newBoard[9][1] ]);
        newBoard[10][0].setRailroadNeighbors([newBoard[9][0], newBoard[11][1]]);  
        newBoard[11][1].setRoadNeighbors([newBoard[11][1], newBoard[9][1]]);
        newBoard[11][1].setRailroadNeighbors([newBoard[10][0], newBoard[10][2]]);  
        newBoard[10][2].setRoadNeighbors([newBoard[11][2], newBoard[9][1], newBoard[9][2], newBoard[9][3]]);
        newBoard[10][2].setRailroadNeighbors([newBoard[11][1], newBoard[10][3]]);  
        newBoard[10][3].setRoadNeighbors([newBoard[11][3], newBoard[9][3]]);
        newBoard[10][3].setRailroadNeighbors([newBoard[10][2], newBoard[10][4]]);  
        newBoard[10][4].setRoadNeighbors([newBoard[11][4]]);
        newBoard[10][4].setRailroadNeighbors([newBoard[10][3],newBoard[9][3]]);  

        
        newBoard[9][0].setRoadNeighbors([ newBoard[9][1] ]);
        newBoard[9][0].setRailroadNeighbors([newBoard[8][0], newBoard[10][0]]);  
        newBoard[9][1].setRoadNeighbors([newBoard[8][0], newBoard[8][1], newBoard[8][2], newBoard[9][0], newBoard[9][2], newBoard[10][0], newBoard[11][1], newBoard[10][2]]);
        newBoard[9][1].setRailroadNeighbors([]);  
        newBoard[9][2].setRoadNeighbors([newBoard[8][2], newBoard[9][1], newBoard[9][3], newBoard[10][2]]);
        newBoard[9][2].setRailroadNeighbors([]);  
        newBoard[9][3].setRoadNeighbors([newBoard[8][2], newBoard[8][3], newBoard[8][4], newBoard[9][2], newBoard[9][3], newBoard[10][2], newBoard[10][3], newBoard[10][4]]);
        newBoard[9][3].setRailroadNeighbors([]);  
        newBoard[9][3].setRoadNeighbors([newBoard[9][3]]);
        newBoard[9][3].setRailroadNeighbors([newBoard[8][4], newBoard[10][4]]);  
           

        newBoard[8][0].setRoadNeighbors([newBoard[7][1], newBoard[8][1], newBoard[9][1]]);
        newBoard[8][0].setRailroadNeighbors([newBoard[7][0], newBoard[9][0]]);  
        newBoard[8][1].setRoadNeighbors([newBoard[7][1], newBoard[8][0], newBoard[8][2], newBoard[9][1]]);
        newBoard[8][1].setRailroadNeighbors([]);  
        newBoard[8][2].setRoadNeighbors([newBoard[7][1], newBoard[7][2], newBoard[7][3], newBoard[8][1], newBoard[8][3], newBoard[9][1], newBoard[9][2], newBoard[9][3]]);
        newBoard[8][2].setRailroadNeighbors([]);  
        newBoard[8][3].setRoadNeighbors([newBoard[7][3], newBoard[8][2], newBoard[8][4], newBoard[9][3]]);
        newBoard[8][3].setRailroadNeighbors([]);  
        newBoard[8][4].setRoadNeighbors([newBoard[7][3], newBoard[8][3], newBoard[9][3]]);
        newBoard[8][4].setRailroadNeighbors([newBoard[7][4], newBoard[9][3]]);  

        
        newBoard[7][0].setRoadNeighbors([newBoard[7][1]]);
        newBoard[7][0].setRailroadNeighbors([newBoard[6][0], newBoard[8][0]]);  
        newBoard[7][1].setRoadNeighbors([newBoard[6][0], newBoard[6][1], newBoard[6][2], newBoard[7][0], newBoard[7][2], newBoard[8][0], newBoard[8][1], newBoard[8][2]]);
        newBoard[7][1].setRailroadNeighbors([]);  
        newBoard[7][2].setRoadNeighbors([newBoard[6][2], newBoard[7][1], newBoard[7][3], newBoard[9][2]]);
        newBoard[7][2].setRailroadNeighbors([]);  
        newBoard[7][3].setRoadNeighbors([newBoard[6][2], newBoard[6][3], newBoard[6][4], newBoard[7][2], newBoard[7][4], newBoard[8][2], newBoard[8][3], newBoard[8][4]]);
        newBoard[7][3].setRailroadNeighbors([]);  
        newBoard[7][4].setRoadNeighbors([newBoard[7][3]]);
        newBoard[7][4].setRailroadNeighbors([newBoard[6][4], newBoard[8][4]]);  


        newBoard[6][0].setRoadNeighbors([newBoard[7][1]]);
        newBoard[6][0].setRailroadNeighbors([newBoard[7][0], newBoard[5][0], newBoard[6][1]]);  
        newBoard[6][1].setRoadNeighbors([newBoard[7][1]]);
        newBoard[6][1].setRailroadNeighbors([newBoard[6][0], newBoard[6][2]]);  
        newBoard[6][2].setRoadNeighbors([newBoard[7][2]]);
        newBoard[6][2].setRailroadNeighbors([newBoard[6][1], newBoard[5][2], newBoard[6][3]]);  
        newBoard[6][3].setRoadNeighbors([newBoard[7][3]]);
        newBoard[6][3].setRailroadNeighbors([newBoard[6][4], newBoard[6][2]]);  
        newBoard[6][4].setRoadNeighbors([newBoard[7][3]]);
        newBoard[6][4].setRailroadNeighbors([newBoard[5][4], newBoard[7][4], newBoard[6][3]]); 

        
        newBoard[5][0].setRoadNeighbors([newBoard[4][1]]);
        newBoard[5][0].setRailroadNeighbors([newBoard[4][0], newBoard[6][0], newBoard[5][1]]);  
        newBoard[5][1].setRoadNeighbors([newBoard[6][1]]);
        newBoard[5][1].setRailroadNeighbors([newBoard[5][0], newBoard[5][2]]);  
        newBoard[5][2].setRoadNeighbors([newBoard[4][1], newBoard[4][2], newBoard[4][3]]);
        newBoard[5][2].setRailroadNeighbors([newBoard[5][1], newBoard[5][3], newBoard[6][2]]);  
        newBoard[5][3].setRoadNeighbors([newBoard[4][3]]);
        newBoard[5][3].setRailroadNeighbors([newBoard[5][2], newBoard[5][4]]);  
        newBoard[5][4].setRoadNeighbors([newBoard[4][3]]);
        newBoard[5][4].setRailroadNeighbors([newBoard[4][4], newBoard[6][4], newBoard[5][3]]); 

        newBoard[4][0].setRoadNeighbors([newBoard[4][1]]);
        newBoard[4][0].setRailroadNeighbors([newBoard[3][0], newBoard[5][0]]);  
        newBoard[4][1].setRoadNeighbors([newBoard[3][0], newBoard[3][1], newBoard[3][2], newBoard[4][2], newBoard[5][2], newBoard[5][1], newBoard[5][0], newBoard[4][0]]);
        newBoard[4][1].setRailroadNeighbors([]);  
        newBoard[4][2].setRoadNeighbors([newBoard[3][2], newBoard[4][3], newBoard[5][2], newBoard[4][1]]);
        newBoard[4][2].setRailroadNeighbors([]);  
        newBoard[4][3].setRoadNeighbors([newBoard[3][2], newBoard[3][3], newBoard[3][4], newBoard[4][4], newBoard[5][4], newBoard[5][3], newBoard[5][2], newBoard[4][2]]);
        newBoard[4][3].setRailroadNeighbors([]);  
        newBoard[4][4].setRoadNeighbors([newBoard[4][3]]);
        newBoard[4][4].setRailroadNeighbors([newBoard[3][4], newBoard[5][4]]); 

        newBoard[3][0].setRoadNeighbors([newBoard[2][1], newBoard[3][1], newBoard[4][1]]);
        newBoard[3][0].setRailroadNeighbors([newBoard[2][0], newBoard[4][0]]);  
        newBoard[3][1].setRoadNeighbors([newBoard[2][1], newBoard[3][0], newBoard[3][2], newBoard[4][1]]);
        newBoard[3][1].setRailroadNeighbors([]);  
        newBoard[3][2].setRoadNeighbors([newBoard[2][1], newBoard[2][2], newBoard[2][3], newBoard[3][3], newBoard[4][3], newBoard[4][2], newBoard[4][1], newBoard[3][1]]);
        newBoard[3][2].setRailroadNeighbors([]);  
        newBoard[3][3].setRoadNeighbors([newBoard[2][3], newBoard[4][3], newBoard[3][2], newBoard[3][4]]);
        newBoard[3][3].setRailroadNeighbors([]);  
        newBoard[3][4].setRoadNeighbors([newBoard[2][3], newBoard[3][3], newBoard[4][3]]);
        newBoard[3][4].setRailroadNeighbors([newBoard[2][4], newBoard[4][4]]); 

        newBoard[2][0].setRoadNeighbors([newBoard[2][1]]);
        newBoard[2][0].setRailroadNeighbors([newBoard[1][0], newBoard[3][0]]);  
        newBoard[2][1].setRoadNeighbors([newBoard[1][0], newBoard[1][1], newBoard[1][2], newBoard[2][2], newBoard[3][2], newBoard[3][1], newBoard[3][0], newBoard[2][0]]);
        newBoard[2][1].setRailroadNeighbors([]);  
        newBoard[2][2].setRoadNeighbors([newBoard[1][2], newBoard[3][2], newBoard[2][1], newBoard[2][3]]);
        newBoard[2][2].setRailroadNeighbors([]);  
        newBoard[2][3].setRoadNeighbors([newBoard[1][2], newBoard[1][3], newBoard[1][4], newBoard[2][4], newBoard[3][4], newBoard[3][3], newBoard[3][2], newBoard[2][2]]);
        newBoard[2][3].setRailroadNeighbors([]);  
        newBoard[2][4].setRoadNeighbors([newBoard[2][3]]);
        newBoard[2][4].setRailroadNeighbors([newBoard[1][4], newBoard[3][4]]); 
        
        newBoard[1][0].setRoadNeighbors([newBoard[0][0], newBoard[2][0], newBoard[2][1]]);
        newBoard[1][0].setRailroadNeighbors([newBoard[2][0], newBoard[1][1]]);  
        newBoard[1][1].setRoadNeighbors([newBoard[0][1], newBoard[2][1]]);
        newBoard[1][1].setRailroadNeighbors([newBoard[1][0], newBoard[1][2]]);  
        newBoard[1][2].setRoadNeighbors([newBoard[2][1], newBoard[2][3]]);
        newBoard[1][2].setRailroadNeighbors([newBoard[1][1], newBoard[1][3]]);  
        newBoard[1][3].setRoadNeighbors([newBoard[0][3], newBoard[2][3]]);
        newBoard[1][3].setRailroadNeighbors([newBoard[1][2], newBoard[1][4]]);  
        newBoard[1][4].setRoadNeighbors([newBoard[2][3], newBoard[0][4]]);
        newBoard[1][4].setRailroadNeighbors([newBoard[1][3], newBoard[2][4]]); 

        newBoard[0][0].setRoadNeighbors([newBoard[1][0], newBoard[0][1]]);
        newBoard[0][0].setRailroadNeighbors([]);  
        newBoard[0][1].setRoadNeighbors([newBoard[0][0], newBoard[0][2], newBoard[1][1]]);
        newBoard[0][1].setRailroadNeighbors([]);  
        newBoard[0][2].setRoadNeighbors([newBoard[0][1], newBoard[0][3], newBoard[1][2]]);
        newBoard[0][2].setRailroadNeighbors([]);  
        newBoard[0][3].setRoadNeighbors([newBoard[0][2], newBoard[0][4], newBoard[1][3]]);
        newBoard[0][3].setRailroadNeighbors([]);  
        newBoard[0][4].setRoadNeighbors([newBoard[0][3], newBoard[1][4]]);
        newBoard[0][4].setRailroadNeighbors([]); 

        return newBoard;
    }

}

