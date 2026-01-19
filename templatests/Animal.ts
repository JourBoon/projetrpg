export class Animal {
    protected name: string; 
    public size: number; // cm
    protected food: string[];
    protected maxAge: number; // in days
    private currentAge = 0;
    protected hungerLevel = 80;
    noise: string | null;

    constructor(name: string, size: number, food: string[], maxAge: number, noise: string | null = null) {
        this.name = name;
        this.size = size;
        this.food = food;
        this.maxAge = maxAge;
        this.noise = noise;
    }

    eat(foodItem: string) {
        if (this.food.includes(foodItem)) {
            this.hungerLevel = Math.max(0, this.hungerLevel - 20);
        }
    }
    makeNoise() {
        if (this.noise) {
            console.log(this.noise);
        }
    }

    ageOneDay() {
        this.currentAge += Math.min(this.currentAge+1, this.maxAge);
        this.hungerLevel += 60;
        if (this.currentAge >= this.maxAge) {
            console.error(`${this.name} has died of old age.`);
        }
        if (this.hungerLevel >= 100) {
            console.error(`${this.name} has died from hunger.`);
        }
    }

    makeChildren() : Promise <Animal[]> {
        console.error("MakeChildren exécuter dans Animal. Ce n'est pas censé arriver.");
        return new Promise((resolve) => resolve([]));
    }
}