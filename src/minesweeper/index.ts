import {Core, ConfigCanvas, Scene, Entity2D, LocalState } from '@angrub/pix-engine';
import Grid from './grid';
import GUI from './GUI/GUI';

class Minesweeper extends Entity2D {
    grid: Grid;
    gui: GUI;
    play: boolean;

    constructor(x: number, y: number, width: number, height: number, mines: number) {
        super(x, y, width, height);

        this.play = true;
        // dependencies & initializing
        this.grid = new Grid(x, y +50, width, height -50);
        this.grid.createGrid(mines);
        this.gui = new GUI(this.grid.mines, x, y, width, 50);
        this.addBehaviour(this.update);
        this.addBehaviour(this.gameOver);
    }

    update(state: LocalState): void {
        if(this.play) {
            const cell = this.grid.getClickedCell();
            if(cell) {
                this.gui.timer.isRunning = true;

                if(this.gui.switchButton.buttonState) {
                    const subtractMine = this.grid.mode2(cell);
                    
                    if(subtractMine === true) {
                        this.gui.mineCounter.subtract();
                    } else if(subtractMine === false) {
                        this.gui.mineCounter.add();
                    }

                } else {
                    this.grid.mode1(cell);
                }
            }  
        }
        this.play = !this.grid.searchExplosion();
    }

    gameOver(state: LocalState): void {
        if(!this.play) {
            this.grid.exposeMines();
            this.gui.timer.isRunning = false;
            state.stop();
            alert('gameover');
        }
    }
}

const createGame = (root: Element, width: number, height: number): void => {
    const config: ConfigCanvas = {
        root: root,
        widthWindow: width,
        heightWindow: height
    }
    
    const game = new Core(config);
    
    const buscaminas = new Minesweeper(0, 0, width, height, 7);
    
    const main = new Scene('Main');
    main.addEntity(buscaminas);
    
    game.addScene(main);
    game.on('Main');
}

export default createGame;