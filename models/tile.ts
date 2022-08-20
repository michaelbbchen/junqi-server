import { Piece } from "./Piece";

export class Tile{
    piece: Piece;
    tileType = TileType;

    railRoadNeighbors: Tile[];
    roadNeighbors: Tile[];
    
    constructor(piece: Piece, tileType: TileType){

        this.piece = piece;
        this.tileType = TileType;
        this.railRoadNeighbors = [];
        this.roadNeighbors = [];

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