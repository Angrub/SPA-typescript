import { Entity2D, LocalState } from "@angrub/pix-engine";

class Cell extends Entity2D {
    static width: number = 30; 
    private _itsExposed?: boolean;
    private strokeColor: string;
    private cellColors: string[];
    private _itsMark: boolean;
    hasMine: boolean;
    nearbyMines: number;
    column: number;
    row: number;

    constructor(hasMine: boolean, nearbyMines: number, x: number, y: number, column: number, row: number) {
        super(x, y, Cell.width, Cell.width)
        this.hasMine = hasMine;
        this.nearbyMines = nearbyMines;
        this._itsMark = false;
        this.column = column;
        this.row = row;
        this.strokeColor = '#7c7c7c';
        this.cellColors = [
            '#c0c0c0', 
            '#0000fe', 
            '#007905', 
            '#f6040e', 
            '#010174', 
            '#7c0003', 
            '#027a7d',
            'brown',
            'yellow',
            '#000',
            '#444',
            '#666'
        ]
        this.switchVisibleShape('entity');
        this.setHitbox({x:'center', y:'center'}, this.width, this.height);
        this.setShapeColor('entity', this.strokeColor, this.cellColors[11]);
    }

    get itsExposed(): boolean {
        return (this._itsExposed) ? this._itsExposed : false;
    }

    set itsExposed(value: boolean) {
        this._itsExposed = value;
        if(!value) {
            this.setShapeColor('entity', this.strokeColor, this.cellColors[11]);
        } else {
            if(this.hasMine) {
                this.setShapeColor('entity', this.strokeColor, this.cellColors[9]);
            } else if(this.nearbyMines > 0) {
                this.setShapeColor('entity', this.strokeColor, this.cellColors[this.nearbyMines]);
            } else {
                this.setShapeColor('entity', this.strokeColor, this.cellColors[0]);
            }
        }
    }

    get itsMark(): boolean {
        return this._itsMark;
    }

    set itsMark(value: boolean) {
        this._itsMark = value;
        if(value) this.setShapeColor('entity', this.strokeColor, this.cellColors[10]);
        else this.setShapeColor('entity', this.strokeColor, this.cellColors[11]);
    }
}

export default Cell;