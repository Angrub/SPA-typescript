import { Entity2D, LocalState } from "@angrub/pix-engine";
import { Hitbox } from "@angrub/pix-engine/lib/utils";

class Button extends Entity2D {
    value1: string;
    value2: string;
    buttonState: boolean;

    constructor(text1: string, text2: string, x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.value1 = text1;
        this.value2 = text2;
        this.buttonState = false;
        this.switchVisibleShape('entity');
        this.setShapeColor('entity', '#000', '#888');
        this.setHitbox({x: 'center', y: "center"}, width, height);
        this.addBehaviour(this.switchState);
        this.setText(this.value1, 'serif', 'black', {x: "center", y: "center"}, width -5, height -5);
    }

    switchState(state: LocalState) {
        if(this.click) {
            this.buttonState = !this.buttonState;
            this.changeText();
        }
    }

    changeText(): void {
        let value: string;

        if(this.buttonState) value = this.value2;
        else value = this.value1; 

        this.setText(value, 'serif', 'black', {x: "center", y: "center"}, this.width -5, this.height -5)
    }
}

export default Button;