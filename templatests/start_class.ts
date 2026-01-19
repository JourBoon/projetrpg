export class Car {
	brand = "";
	modelName = "";
	engineType = "";
	seats = 5;
	speed = 50; //km/h
	tankCapacity = 55; //L
    tankLevel = 0; //L
    fuelConsumption = 7; //L/100km à 80km/h

    drive(distance: number): void {
        if (this.speed <= 0) {
            console.error("Le voiture ne peut pas être a l'arrêt.");
        }
        this.tankLevel -= (this.speed * 0.1 * this.fuelConsumption * distance) / 100;
    }

    fillUpThank(litres:number):void {
        this.tankLevel += litres;
        if (this.tankLevel > this.tankCapacity) {
            this.tankLevel = this.tankCapacity;
        }
    }
}

const ferrari = new Car();
ferrari.brand = "Ferrari";
ferrari.modelName = "F8 Tributo";
ferrari.engineType = "V8";
ferrari.seats = 2;
ferrari.speed = 150;
ferrari.tankCapacity = 70;