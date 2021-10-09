import { Entity2D } from "@angrub/pix-engine";
import Display from "./display";

class Counter extends Entity2D {
    private acum: number;
    display: Display;

    constructor(initialValue: number, x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.acum = initialValue;
        this.display = new Display(x, y, width, height);
        this.display.setValue(initialValue);
    }

    add(): void {
        this.acum++;
        this.display.setValue(this.acum);
    }

    subtract(): void {
        this.acum--;
        this.display.setValue(this.acum);
    }
}

export default Counter;