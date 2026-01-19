import { Color } from "./main.ts";
export default class Pen {
    color: Color;
    inkLevel: number;
    inkMaxLevel = 100;

    constructor(color: Color, inkLevel: number) {
        this.color = color;
        this.inkLevel = inkLevel;
    }

    Draw(lines: number): void {
        lines = lines / 1000;
        if (lines <=0 ){
            console.error("La distance ne peut pas être négative ou nulle.");
        }
        if (this.inkLevel-lines <= 0) {
            console.error("Le stylo n'a plus d'encre.");
        }
        for (lines; lines > 0; lines--) {
            lines+= 0.99;
            if (this.inkLevel <= 0) {
                console.error("Le stylo n'a plus d'encre.");
                break;
            }
            this.inkLevel -= 1;
        }
    }
}