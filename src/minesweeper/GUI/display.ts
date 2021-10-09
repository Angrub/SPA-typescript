import { Entity2D } from "@angrub/pix-engine";

class Display extends Entity2D {
    private _value: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this._value = 0;
        this.setText(this._value, 'serif', '#000', {x: 'center', y: 'center'}, width -5, height -5);
    }

    setValue(value: number): void {
        this._value = value;
        this.text?.changeText(`${this._value}`);
    }

}

export default Display;