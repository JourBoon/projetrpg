import { Animal } from "./Animal.ts";

export class Oviparous extends Animal {
    eggIncubation:number = 20; // days

    constructor (name: string, size: number, food: string[], maxAge: number, eggIncubation: number, noise: string | null = null) {
        super(name, size, food, maxAge, noise);
        this.eggIncubation = eggIncubation;
    }

    layEggs():Promise<Oviparous> | null {
        if (this.hungerLevel > 50) {
            console.error(`${this.name} is too hungry to lay eggs.`);
            return null;
        }
        console.log(`${this.name} has laid eggs. Incubation will take ${this.eggIncubation} days.`);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`The eggs of ${this.name} have hatched.`);
                resolve(new Oviparous(
                    "Jr." + this.name,
                    this.size,
                    this.food,
                    this.maxAge,
                    this.eggIncubation,
                    this.noise
                ));
            }, this.eggIncubation * 1000);
        });
    }

    override makeChildren(): Promise<Animal[]> {
        return new Promise((resolve) => resolve(this.layEggs()));
    }
}