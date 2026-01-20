import { Character } from './Character.ts';
import { CharacterStats } from '../interfaces/CharacterStats.ts';

/**
 * @deprecated Cette classe est obsolète. Utilisez Adventurer et ses sous-classes à la place.
 * Classe représentant le joueur
 * Hérite de Character et ajoute la notion de niveau et d'expérience
 */
export class Player extends Character {
  private level: number;
  private experience: number;

  constructor(name: string) {
    const baseStats: CharacterStats = {
      name: name,
      hp: 100,
      maxHp: 100,
      attack: 15,
      defense: 5,
      speed: 10,
    };
    super(baseStats);
    this.level = 1;
    this.experience = 0;
  }

  /**
   * Implémentation minimale de performAction pour compatibilité
   * @deprecated Utiliser les classes Adventurer spécialisées
   */
  public async performAction(allies: Character[], enemies: Character[]): Promise<void> {
    const aliveEnemies = enemies.filter((e) => e.isAlive());
    if (aliveEnemies.length > 0) {
      const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      this.attackTarget(target);
    }
  }

  /**
   * Ajoute de l'expérience au joueur et vérifie si un niveau est gagné
   * @param amount Quantité d'expérience gagnée
   */
  public gainExperience(amount: number): void {
    this.experience += amount;
    console.log(`${this.name} gagne ${amount} XP ! (Total: ${this.experience})`);

    const expNeeded = this.getExpForNextLevel();
    if (this.experience >= expNeeded) {
      this.levelUp();
    }
  }

  /**
   * Monte le joueur d'un niveau et améliore ses stats
   */
  private levelUp(): void {
    this.level++;
    this.experience = 0;

    // Amélioration des stats à chaque niveau
    this.maxHp += 20;
    this.hp = this.maxHp; // Soin complet au level up
    this.attack += 3;
    this.defense += 2;
    this.speed += 1;

    console.log(`\n🎉 ${this.name} monte au niveau ${this.level} !`);
    console.log(`Stats améliorées : HP+20, ATK+3, DEF+2, SPD+1\n`);
  }

  /**
   * Calcule l'expérience nécessaire pour le prochain niveau
   */
  private getExpForNextLevel(): number {
    return this.level * 100;
  }

  /**
   * Accesseurs pour le niveau et l'expérience
   */
  public getLevel(): number {
    return this.level;
  }

  public getExperience(): number {
    return this.experience;
  }

  /**
   * Affiche les statistiques complètes du joueur
   */
  public displayFullStats(): void {
    console.log(`\n=== ${this.name} (Niveau ${this.level}) ===`);
    console.log(`HP: ${this.hp}/${this.maxHp}`);
    console.log(`Attaque: ${this.attack}`);
    console.log(`Défense: ${this.defense}`);
    console.log(`Vitesse: ${this.speed}`);
    console.log(`Expérience: ${this.experience}/${this.getExpForNextLevel()}`);
    console.log(`===============================\n`);
  }
}
