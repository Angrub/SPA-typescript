import { Entity2D, LocalState } from "@angrub/pix-engine";
import Display from "./display";

class Timer extends Entity2D {
    display1: Display;
    display2: Display;
    seconds: number;
    minutes: number;
    previousDate: number
    isRunning: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.display1 = new Display(x, y, width, height);
        this.display2 = new Display(x - width / 1.5, y, width, height);
        this.seconds = 0;
        this.minutes = 0;
        this.previousDate = 0;
        this.isRunning = false;
        this.addBehaviour(this.run);
    }

    run(state: LocalState): void {
        if(this.isRunning) {
            let date = new Date();
            let aux = date.getSeconds();
            
            if(aux != this.previousDate) {
                this.previousDate = aux;
                this.seconds++;
                
                this.updateValue();
            }
        }
    }

    updateValue(): void {
        if(this.seconds > 60) {
            this.seconds = this.seconds - 60;
            this.minutes++;
            this.display1.setValue(this.seconds);
            this.display2.setValue(this.minutes);
        } else {
            this.display1.setValue(this.seconds);
        }
    }
}

export default Timer;