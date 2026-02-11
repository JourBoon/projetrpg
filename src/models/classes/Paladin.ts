import { Adventurer } from '../Adventurer.ts';
import { Character } from '../Character.ts';
import { CharacterStats } from '../../interfaces/CharacterStats.ts';

/**
 * Classe Paladin : Attaque de zone Sainte (40% de dégâts physiques sur TOUS les ennemis)
 */
export class Paladin extends Adventurer {
  constructor(name: string) {
    const stats: CharacterStats = {
      name: name,
      hp: 110,
      maxHp: 110,
      attack: 16,
      defense: 8,
      speed: 7,
      mana: 80,
      maxMana: 80,
    };
    super(name, stats, 'Paladin');
  }

  protected levelUp(): void {
    this.level++;
    this.experience = 0;

    this.maxHp += 22;
    this.hp = this.maxHp;
    this.maxMana += 15;
    this.mana = this.maxMana;
    this.attack += 3;
    this.defense += 2;
    this.speed += 1;

    console.log(`\n🎉 ${this.name} monte au niveau ${this.level} !`);
    console.log(`Stats améliorées : HP+22, MANA+15, ATK+3, DEF+2, SPD+1\n`);
  }

  protected getAvailableActions(): string[] {
    const actions = ['⚔️  Attaque normale'];

    if (this.mana >= 40) {
      actions.push('✨ Châtiment Divin (40 mana, 40% ATK sur tous les ennemis)');
    } else {
      actions.push('✨ Châtiment Divin (40 mana) - PAS ASSEZ DE MANA');
    }

    if (this.mana >= 25) {
      actions.push('🛡️  Bouclier Sacré (25 mana, +100% DEF ce tour)');
    } else {
      actions.push('🛡️  Bouclier Sacré (25 mana) - PAS ASSEZ DE MANA');
    }

    return actions;
  }

  protected async executeAction(
    actionIndex: number,
    _allies: Character[],
    ennemis: Character[]
  ): Promise<void> {
    switch (actionIndex) {
      case 0: // Attaque normale
        await this.normalAttack(ennemis);
        break;
      case 1: // Châtiment Divin
        if (this.mana >= 40) {
          await this.divineSmite(ennemis);
        } else {
          console.log('❌ Pas assez de mana !');
        }
        break;
      case 2: // Bouclier Sacré
        if (this.mana >= 25) {
          this.sacredShield();
        } else {
          console.log('❌ Pas assez de mana !');
        }
        break;
    }
  }

  private async normalAttack(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      console.log(`${this.name} attaque ${cible.getName()} avec son épée sacrée !`);
      cible.takeDamage(this.attack);
    }
  }

  private async divineSmite(ennemis: Character[]): Promise<void> {
    if (this.consumeMana(40)) {
      console.log(
        `${this.name} invoque un Châtiment Divin sur tous les ennemis ! (-40 mana)`
      );

      const ennemisVivants = ennemis.filter((e) => e.isAlive());
      ennemisVivants.forEach((enemy) => {
        const degatsBase = Math.max(1, this.attack - enemy.getDefense());
        const degatsZone = Math.floor(degatsBase * 0.4);
        console.log(`  → ${enemy.getName()} est touché par la lumière divine !`);
        enemy.takeTrueDamage(degatsZone);
      });
    }
  }

  private sacredShield(): void {
    if (this.consumeMana(25)) {
      const defenseBoost = this.defense; // +100%
      this.defense += defenseBoost;
      console.log(
        `${this.name} invoque un Bouclier Sacré ! (+${defenseBoost} DEF ce tour) (-25 mana)`
      );
    }
  }
}
