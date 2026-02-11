import { Monster, Loot } from './Monster.ts';
import { Character } from './Character.ts';
import { CharacterStats } from '../interfaces/CharacterStats.ts';

export class Boss extends Monster {
  private aoeAttackChance: number;
  private aoeAttackName: string;

  constructor(
    name: string,
    stats: CharacterStats,
    loot: Loot,
    aoeAttackName: string = 'Attaque Dévastatrice'
  ) {
    super(name, stats, loot);
    this.aoeAttackChance = 0.3;
    this.aoeAttackName = aoeAttackName;
  }

  public override async performAction(_allies: Character[], ennemis: Character[]): Promise<void> {
    const ennemisVivants = ennemis.filter((e) => e.isAlive());
    if (ennemisVivants.length === 0) return;

    console.log(`\n--- Tour de ${this.name} (BOSS) ---`);

    if (Math.random() < this.aoeAttackChance) {
      this.areaAttack(ennemisVivants);
    } else {
      let cible: Character;

      if (Math.random() < 0.2) {
        cible = this.selectWeakestTarget(ennemisVivants);
        console.log(`${this.name} cible le plus faible !`);
      } else {
        cible = ennemisVivants[Math.floor(Math.random() * ennemisVivants.length)];
      }

      this.attackTarget(cible);
    }

    await this.delay(1000);
  }

  /**
   * Attaque de zone : inflige des dégâts à tous les ennemis
   */
  private areaAttack(cibles: Character[]): void {
    console.log(
      `💥 ${this.name} utilise ${this.aoeAttackName} sur tous les adversaires !`
    );

    cibles.forEach((cible) => {
      if (cible.isAlive()) {
        const degatsBase = Math.max(1, this.getAttack() - cible.getDefense());
        const degatsZone = Math.floor(degatsBase * 0.4);
        console.log(`  → ${cible.getName()} est touché !`);
        cible.takeTrueDamage(degatsZone);
      }
    });
  }

  /**
   * Méthodes statiques pour créer des Boss prédéfinis
   */
  public static createDragonBoss(): Boss {
    return new Boss(
      'Dragon Ancien',
      {
        name: 'Dragon Ancien',
        hp: 250,
        maxHp: 250,
        attack: 30,
        defense: 15,
        speed: 10,
      },
      {
        gold: 500,
        experience: 300,
      },
      'Souffle de Flammes'
    );
  }

  public static createDemonLord(): Boss {
    return new Boss(
      'Seigneur Démon',
      {
        name: 'Seigneur Démon',
        hp: 300,
        maxHp: 300,
        attack: 35,
        defense: 12,
        speed: 12,
      },
      {
        gold: 750,
        experience: 500,
      },
      'Vague des Ténèbres'
    );
  }

  public static createOrcWarlord(): Boss {
    return new Boss(
      'Chef de Guerre Orc',
      {
        name: 'Chef de Guerre Orc',
        hp: 180,
        maxHp: 180,
        attack: 28,
        defense: 10,
        speed: 7,
      },
      {
        gold: 300,
        experience: 200,
      },
      'Rage Destructrice'
    );
  }
}
