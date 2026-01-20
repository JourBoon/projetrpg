import { Adventurer } from '../Adventurer.ts';
import { Character } from '../Character.ts';
import { CharacterStats } from '../../interfaces/CharacterStats.ts';

/**
 * Classe Guerrier : Équilibré avec haute défense
 */
export class Warrior extends Adventurer {
  constructor(name: string) {
    const stats: CharacterStats = {
      name: name,
      hp: 120,
      maxHp: 120,
      attack: 18,
      defense: 10,
      speed: 8,
      mana: 0,
      maxMana: 0,
    };
    super(name, stats, 'Guerrier');
  }

  protected levelUp(): void {
    this.level++;
    this.experience = 0;

    this.maxHp += 25;
    this.hp = this.maxHp;
    this.attack += 4;
    this.defense += 3;
    this.speed += 1;

    console.log(`\n🎉 ${this.name} monte au niveau ${this.level} !`);
    console.log(`Stats améliorées : HP+25, ATK+4, DEF+3, SPD+1\n`);
  }

  protected getAvailableActions(): string[] {
    return [
      '⚔️  Attaque normale',
      '🛡️  Posture défensive (+50% DEF ce tour)',
      '💥 Coup puissant (150% ATK, -20% précision)',
    ];
  }

  protected async executeAction(
    actionIndex: number,
    _allies: Character[],
    enemies: Character[]
  ): Promise<void> {
    switch (actionIndex) {
      case 0: // Attaque normale
        await this.normalAttack(enemies);
        break;
      case 1: // Posture défensive
        this.defensiveStance();
        break;
      case 2: // Coup puissant
        await this.powerStrike(enemies);
        break;
    }
  }

  private async normalAttack(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target) {
      console.log(`${this.name} attaque ${target.getName()} !`);
      target.takeDamage(this.attack);
    }
  }

  private defensiveStance(): void {
    const defenseBoost = Math.floor(this.defense * 0.5);
    this.defense += defenseBoost;
    console.log(
      `${this.name} adopte une posture défensive ! (+${defenseBoost} DEF ce tour)`
    );
  }

  private async powerStrike(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target) {
      const hit = Math.random() > 0.2; // 80% de chances de toucher
      if (hit) {
        const damage = Math.floor(this.attack * 1.5);
        console.log(`${this.name} utilise Coup Puissant sur ${target.getName()} !`);
        target.takeDamage(damage);
      } else {
        console.log(`${this.name} utilise Coup Puissant mais rate sa cible !`);
      }
    }
  }
}
