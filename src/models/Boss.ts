import { Monster, Loot } from './Monster.ts';
import { Character } from './Character.ts';
import { CharacterStats } from '../interfaces/CharacterStats.ts';

/**
 * Classe Boss : Hérite de Monster avec une attaque de zone
 * 30% de probabilité de déclencher une attaque de zone
 */
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
    this.aoeAttackChance = 0.3; // 30% de chances
    this.aoeAttackName = aoeAttackName;
  }

  /**
   * Override de performAction pour ajouter l'attaque de zone
   */
  public override async performAction(_allies: Character[], enemies: Character[]): Promise<void> {
    const aliveEnemies = enemies.filter((e) => e.isAlive());
    if (aliveEnemies.length === 0) return;

    console.log(`\n--- Tour de ${this.name} (BOSS) ---`);

    // 30% de chances d'utiliser l'attaque de zone
    if (Math.random() < this.aoeAttackChance) {
      this.areaAttack(aliveEnemies);
    } else {
      // Sinon, attaque normale avec IA standard
      let target: Character;

      if (Math.random() < 0.2) {
        target = this.selectWeakestTarget(aliveEnemies);
        console.log(`${this.name} cible le plus faible !`);
      } else {
        target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      }

      this.attackTarget(target);
    }

    // Délai de 1 seconde
    await this.delay(1000);
  }

  /**
   * Attaque de zone : inflige des dégâts à tous les ennemis
   */
  private areaAttack(targets: Character[]): void {
    const aoeDamage = Math.floor(this.getAttack() * 0.6); // 60% de l'attaque
    console.log(
      `💥 ${this.name} utilise ${this.aoeAttackName} sur tous les adversaires !`
    );

    targets.forEach((target) => {
      if (target.isAlive()) {
        console.log(`  → ${target.getName()} est touché !`);
        target.takeDamage(aoeDamage);
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
