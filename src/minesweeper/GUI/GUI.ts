import { Entity2D } from "@angrub/pix-engine";
import Button from "./button";
import Timer from "./timer";
import Counter from "./counter";

class GUI extends Entity2D {
    switchButton: Button;
    timer: Timer;
    mineCounter: Counter;

    constructor(mines: number, x: number, y: number, width: number, height: number ) {
        super(x, y, width, height);
        this.timer = new Timer(0, 0, 0, 0);
        this.switchButton = new Button('', '', 0, 0, 0, 0);
        this.mineCounter = new Counter(0, 0, 0, 0, 0);
        this.positionItems(mines, width, height);
    }

    positionItems(mines: number, width: number, height: number): void {
        let hItems = height * 0.8;
        let block = 20;
        let timerX = width * 0.23;
        let buttonX = width * 0.426;
        let couterX = width * 0.74;
        this.timer = new Timer(timerX, 5, block*3, hItems);
        this.switchButton = new Button('mine', 'flag', buttonX, 5, block*2, hItems );
        this.mineCounter = new Counter(mines, couterX, 5, block*3, hItems);
    }
}

export default GUI;