import { Tile } from "../tile";

export interface IBoard{
    board: Tile[][],

    getState(): void;//TODO: determine return type 
}
