import { contact } from "./contact.ts";

export class Box {
    length : number;
    width : number;
    height : number;

    material : string ;
    content : string[] ;
    maxCapacity : number ;

    constructor(length: number, width: number, height: number, material: "carton", maxCapacity: number) {
        this.length = length;
        this.width = width;
        this.height = height;
        this.material = material;
        this.maxCapacity = maxCapacity;
        this.content = [];
    }

    addItem (item: string):void{
        if (this.content.length < this.maxCapacity){
            this.content.push (item) ;
        } else {
            console.error ("Boite pleine, impossible d'ajouter un élément") ;
        }
    }

    getVolume():void{
        const volume = this.length * this.width * this.height ;
        console.log ("Volume de la boite : " + volume + " cm3");
    }

    empty():void{
        this.content = [];
    }

}

const shoeBox = new Box(30, 15, 10, "carton", 2) ;
