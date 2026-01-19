import P from "./Pen.ts";

const enum Color {
    Red = "Red",
    Blue = "Blue",
    Green = "Green",
    Black = "Black"
}

export class FourColorsPen {

    pens: P[];

    constructor(colors : Color[]) {
        this.pens = [];
        for (const color of colors) {
            this.pens.push(new P(color, 100));
        }
        //this.pens = colors.map(color => new P(color, 100)); // Même chose mais en utilisant map
    }
    
    draw = (color :Color, lines:number) :void => {
        let desiredPen = null;
        for (const pen of this.pens) {
            if (pen.color === color) {
                desiredPen = pen;
                break;
            }
        }
        if (desiredPen === null) {
            console.error("Le stylo de couleur " + color + " n'existe pas.");
            return;
        }
        desiredPen.Draw(lines);
        console.log(`Niveau d'encre restant dans le stylo ${color} : ${desiredPen.inkLevel}`);
    }
}

