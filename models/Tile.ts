import { ITile } from "./interfaces/ITile";
import { IPiece} from "./interfaces/IPiece"

export class Tile implements ITile {
    piece: IPiece;
    tileType: TileType;

    railRoadNeighbors: Tile[];
    roadNeighbors: Tile[];
    
    constructor(piece: IPiece, tileType: TileType){
        this.piece = piece;
        this.tileType = tileType;
        this.railRoadNeighbors = [];
        this.roadNeighbors = [];
    }

    setPiece(piece: IPiece): void {
        this.piece = piece;
    }

    getTileType(): TileType {
        return this.tileType;
    }

    getPiece(): IPiece {
        return this.piece;
    }

    setRailRoadNeighbors(neighbors: Tile[]): void{
        this.railRoadNeighbors = neighbors;
    }

    setRoadNeighbors(neighbors: Tile[]): void{
        this.roadNeighbors = neighbors;
    }
    
}

export enum TileType{
    Post = 1,
    Campsite=2,
    HQ=3
}