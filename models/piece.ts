export class Piece{
    rank: Rank;
    player: number;

    constructor(r: Rank, p: number){
        this.rank = r;
        this.player= p;
    }
}

enum Rank{
    Empty = -1,
    Flag=0,
    Engineer=1,
    Lieutenant=2,
    Captain=3,
    Major=4,
    Colonel=5,
    BrigadierGeneral=6,
    MajorGeneral=7,
    General=8,
    FieldMarshal = 9,
    Landmine=10,
    Bomb=11



}



