import { Character } from './Character.ts';
import { CharacterStats } from '../interfaces/CharacterStats.ts';

/**
 * Interface définissant le butin qu'un monstre peut donner
 */
export interface Loot {
  gold: number;
  experience: number;
}

/**
 * Classe représentant un monstre
 * Hérite de Character et ajoute un type, du butin et une IA simple
 */
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

  /**
   * Implémentation de performAction pour les monstres (IA automatique)
   * 20% de chances de viser le plus faible, 80% de chances de viser au hasard
   */
  public async performAction(_allies: Character[], enemies: Character[]): Promise<void> {
    const aliveEnemies = enemies.filter((e) => e.isAlive());
    if (aliveEnemies.length === 0) return;

    let target: Character;

    // 20% de chances de viser le joueur avec les PV les plus bas
    if (Math.random() < 0.2) {
      target = this.selectWeakestTarget(aliveEnemies);
      console.log(`\n--- ${this.name} cible stratégiquement le plus faible ! ---`);
    } else {
      // 80% de chances de viser au hasard
      target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      console.log(`\n--- Tour de ${this.name} ---`);
    }

    this.attackTarget(target);

    // Délai de 1 seconde pour la lisibilité
    await this.delay(1000);
  }

  /**
   * Sélectionne la cible avec le moins de HP
   */
  protected selectWeakestTarget(targets: Character[]): Character {
    return targets.reduce((weakest, current) =>
      current.getHp() < weakest.getHp() ? current : weakest
    );
  }

  /**
   * Délai asynchrone
   */
  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Retourne le butin du monstre
   */
  public getLoot(): Loot {
    return {
      gold: this.lootGold,
      experience: this.lootExperience,
    };
  }

  /**
   * Retourne le type du monstre
   */
  public getType(): string {
    return this.type;
  }

  /**
   * Méthode statique pour créer des monstres prédéfinis
   */
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
}
