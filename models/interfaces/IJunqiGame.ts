import { Piece } from "../piece";
import { IBoard } from "./IBoard";
import mongoose, { Document, Schema } from "mongoose";

export interface IJunqiGame{
    name: string;
    board: IBoard;
    turn: number;
    started: boolean;
    ready: Map<string, boolean>
    getBoard(): void;
    
}

export interface IJunqiGameModel extends IJunqiGame, Document {}

export const IJunqiGameSchema : Schema = new Schema({
    name: { type : String, required : true},
    board: { type : Object, required : true},
    turn: { type : Number, required: true},
    started : { type : Boolean, required : true},
    ready : { type : Map, required : true }
});

export default mongoose.model<IJunqiGameModel>('JunqiGame', IJunqiGameSchema);