import { Animal } from "./Animal.ts";
import { Viviparous } from "./Viviparous.ts";


const duck = new Animal("Duck", 25, ["bread","grain","bug","algea"],15*365, "Quack quack");
const elephant = new Viviparous("Elephant", 350, ["leaf","fruit","peanut"],60*365, 1 ,"Toot toot");
const horseshoecrabe = new Animal("Horseshoecrab", 60, ["algea","plankton","small fish","worm"],20*365);
const shoebill = new Animal("Shoebill", 140, ["fish","frog","snake"],35*365, "RATATTATATTATATATTATATATATATATATATATATATATATATATATATATATATATATATATATATATATATATAT");

const animals = [duck, elephant, horseshoecrabe, shoebill];

for (const animal of animals) {
    animal.makeNoise();
}

const doSomething = (viviparous: Viviparous) => {
    const babies = viviparous.giveBirth();
    animals.push(...babies);
}
for (const animal of animals) {
    animal.makeNoise();
}
doSomething(elephant);