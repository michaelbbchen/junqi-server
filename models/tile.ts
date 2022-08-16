import { Piece } from "./piece";

export class Tile{
    piece: Piece;
    tileType = TileType;

    railRoadNeighbors: Tile[];
    roadNeighbors: Tile[];
    
    constructor(piece: Piece, tileType: TileType, railRoadNeighbors: Tile[], roadNeighbors: Tile[]){

        this.piece = piece;
        this.tileType = TileType;
        this.railRoadNeighbors = railRoadNeighbors;
        this.roadNeighbors = roadNeighbors;

    }
}

enum TileType{
    Post,
    Campsite,
    Frontlines,
    HQ
}