export class Piece{
    rank: Rank;
    player: number;

    constructor(r: Rank, p: number){
        this.rank = r;
        this.player= p;
    }
}

enum Rank{
    Flag,
    Landmine,
    Bomb,
    Engineer,
    Lieutenant,
    Captain,
    Major,
    Colonel,
    BrigadierGeneral,
    MajorGeneral,
    General,
    FieldMarshal

}



