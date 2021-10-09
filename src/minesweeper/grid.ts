import Cell from "./cell";
import { Entity2D, LocalState } from "@angrub/pix-engine";

class Grid extends Entity2D {
    columns: number;
    rows: number;
    content?: Cell[][];
    mines: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.columns = Math.floor(width / Cell.width);
        this.rows = Math.floor(height / Cell.width);
        this.mines = 0;
        this.setHitbox({x:'center', y:'center'}, width, height);
    }

    createGrid(percentageOfMines: number) {
        
        // create grid with mines
        this.content = new Array(this.columns);
        
        for(let i = 0; i < this.columns; i++) {
            this.content[i] = new Array(this.rows);

            for(let j = 0; j < this.rows; j++) {

                let x, y: number;
                x = this.x + i * Cell.width;
                y = this.y + j * Cell.width;
                const mine = this.randomMine(percentageOfMines);
                this.content[i][j] = new Cell(mine, 0, x, y, i, j);
                if(mine) this.mines++;
            }
        }

        // sets the values of nearbyMines
        for(let i = 0; i < this.columns; i++) {
            for(let j = 0; j < this.rows; j++) {

                if(!this.content[i][j].hasMine) {
                    this.content[i][j].nearbyMines = this.nearbyMinesCouter(i, j);
                }
                
            }
        }

    }

    private randomMine(percentageOfMines: number): boolean {
        const percetage = Math.abs(percentageOfMines);
        if(percetage > 100) throw new Error('Invalid percentage');

        const randomNumber = Math.round(Math.random() * 100);

        if(randomNumber <= percetage) {
            return true;
        } else {
            return false;
        }
    }

    private nearbyMinesCouter(index1: number, index2: number): number {
        const nearbyCells = this.getNearbyCells(index1, index2);
        let counter = 0;

        nearbyCells.forEach(cell => {
            if(cell.hasMine) counter++;
        })

        return counter;
    } 

    private getNearbyCells(index1: number, index2: number): Cell[] {
        if(this.content === undefined) throw new Error('The grid is not created')
        const nearbyCells: Cell[] = [];

        const freeLeft = index1 > 0;
        const freeRight = index1 < this.columns -1;
        const freeTop = index2 > 0;
        const freeBottom = index2 < this.rows -1;

        if(freeLeft) nearbyCells.push(this.content[index1 -1][index2]);
        if(freeRight) nearbyCells.push(this.content[index1 +1][index2]);
        if(freeTop) nearbyCells.push(this.content[index1][index2 -1]);
        if(freeBottom) nearbyCells.push(this.content[index1][index2 +1]);
        if(freeLeft && freeTop) nearbyCells.push(this.content[index1 -1][index2 -1]);
        if(freeRight && freeTop) nearbyCells.push(this.content[index1 +1][index2 -1]);
        if(freeRight && freeBottom) nearbyCells.push(this.content[index1 +1][index2 +1]);
        if(freeLeft && freeBottom) nearbyCells.push(this.content[index1 -1][index2 +1]);
        
        return nearbyCells;
    }

    mode2(cell: Cell): void | boolean {
        if(cell.itsExposed) {
            this.clearNearbyCells(cell.nearbyMines, cell.column, cell.row);
        } else {
            cell.itsMark = !cell.itsMark;
            return cell.itsMark;
        }
    }

    mode1(cell: Cell): void | boolean {
        this.clearGrid(cell)
    }

    getClickedCell(): Cell | undefined {
        if(!this.content || !this.click) return undefined;
        
        let cellClicked: Cell | undefined; 
        this.content.forEach(column => {
            let aux = column.find(cell => cell.click);
            if(aux) cellClicked = aux;
        })
        
        if(cellClicked) {
            return cellClicked;
        }
    }

    searchExplosion(): boolean {
        let explosion: boolean = false;
        this.content?.forEach(column => {
            column.forEach(cell => {
                if(cell.hasMine && cell.itsExposed) {
                    
                    explosion = true;
                }
            })
        })
        return explosion;
    }

    exposeMines(): void {
        const allMines: Cell[] = [];
        this.content?.forEach(column => {
            const mines = column.filter(cell => cell.hasMine === true);
            
            allMines.push(...mines);
        });
        
        allMines.forEach(cell => cell.itsExposed = true);
    }

    private clearGrid(cell: Cell): void {
        if(!cell.itsExposed) cell.itsExposed = true;
        if(cell.nearbyMines > 0 || cell.hasMine) return undefined

        const nearbyCells = this.getNearbyCells(cell.column, cell.row);
        const unexposedCells = nearbyCells.filter(cell => !cell.itsExposed);

        unexposedCells.forEach(cell => this.clearGrid(cell));
        
    }

    private clearNearbyCells(nearbyMines: number, index1: number, index2: number): void {
        const nearbyCells = this.getNearbyCells(index1, index2);
        const unexposedCells = nearbyCells.filter(cell => !cell.itsExposed);
        const markCells = unexposedCells.filter(cell => cell.itsMark)

        if(markCells.length === nearbyMines) {
            unexposedCells.forEach(cell => {
                if(!cell.itsMark) cell.itsExposed = true
            });
        }
    }

}

export default Grid;