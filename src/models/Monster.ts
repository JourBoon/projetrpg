import { Character } from './Character.ts';
import { CharacterStats } from '../interfaces/CharacterStats.ts';

export interface Loot {
  gold: number;
  experience: number;
}

export class Monster extends Character {
  private type: string;
  private lootGold: number;
  private lootExperience: number;

  constructor(type: string, stats: CharacterStats, loot: Loot) {
    super(stats);
    this.type = type;
    this.lootGold = loot.gold;
    this.lootExperience = loot.experience;
  }

  public async performAction(_allies: Character[], ennemis: Character[]): Promise<void> {
    const ennemisVivants = ennemis.filter((e) => e.isAlive());
    if (ennemisVivants.length === 0) return;

    let cible: Character;

    if (Math.random() < 0.2) {
      cible = this.selectWeakestTarget(ennemisVivants);
      console.log(`\n--- ${this.name} cible stratégiquement le plus faible ! ---`);
    } else {
      cible = ennemisVivants[Math.floor(Math.random() * ennemisVivants.length)];
      console.log(`\n--- Tour de ${this.name} ---`);
    }

    this.attackTarget(cible);

    await this.delay(1000);
  }

  protected selectWeakestTarget(cibles: Character[]): Character {
    return cibles.reduce((plusFaible, actuel) =>
      actuel.getHp() < plusFaible.getHp() ? actuel : plusFaible
    );
  }

  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getLoot(): Loot {
    return {
      gold: this.lootGold,
      experience: this.lootExperience,
    };
  }

  public getType(): string {
    return this.type;
  }
  public static createGoblin(): Monster {
    return new Monster(
      'Gobelin',
      {
        name: 'Gobelin',
        hp: 50,
        maxHp: 50,
        attack: 10,
        defense: 2,
        speed: 8,
      },
      {
        gold: 10,
        experience: 25,
      }
    );
  }

  public static createOrc(): Monster {
    return new Monster(
      'Orc',
      {
        name: 'Orc',
        hp: 80,
        maxHp: 80,
        attack: 15,
        defense: 5,
        speed: 5,
      },
      {
        gold: 25,
        experience: 50,
      }
    );
  }

  public static createDragon(): Monster {
    return new Monster(
      'Dragon',
      {
        name: 'Dragon',
        hp: 150,
        maxHp: 150,
        attack: 25,
        defense: 10,
        speed: 12,
      },
      {
        gold: 100,
        experience: 150,
      }
    );
  }

  public static createTroll(): Monster {
    return new Monster(
      'Troll',
      {
        name: 'Troll',
        hp: 120,
        maxHp: 120,
        attack: 20,
        defense: 8,
        speed: 4,
      },
      {
        gold: 40,
        experience: 75,
      }
    );
  }

  public static createSkeleton(): Monster {
    return new Monster(
      'Squelette',
      {
        name: 'Squelette',
        hp: 60,
        maxHp: 60,
        attack: 12,
        defense: 3,
        speed: 10,
      },
      {
        gold: 15,
        experience: 30,
      }
    );
  }
}
