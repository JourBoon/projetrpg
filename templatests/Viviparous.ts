import { Animal } from "./Animal.ts";

export class Viviparous extends Animal {
    private childrenPerLitter: number;

    constructor (name: string, size: number, food: string[], maxAge: number, childrenPerLitter: number, noise: string | null = null) {
        super(name, size, food, maxAge, noise);
        this.childrenPerLitter = childrenPerLitter;
    }

    giveBirth(): Viviparous[] {
        this.makeNoise();
        const results: Viviparous[] = [];
        for (let i=0; i<this.childrenPerLitter; i++) {
            results.push(new Viviparous(
                " Jr. " + this.name + (i+1),
                this.size / 3,
                this.food,
                this.maxAge,
                this.childrenPerLitter,
                this.noise
            ));
        }
        console.log(`${this.name} has given birth to ${results.length} babies : `);
        console.log(results);
        return results;
    }
}