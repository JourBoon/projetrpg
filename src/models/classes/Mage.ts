import { Adventurer } from '../Adventurer.ts';
import { Character } from '../Character.ts';
import { CharacterStats } from '../../interfaces/CharacterStats.ts';

/**
 * Classe Mage : Faible défense, utilise Mana, attaque magique qui ignore la défense
 */
export class Mage extends Adventurer {
  constructor(name: string) {
    const stats: CharacterStats = {
      name: name,
      hp: 80,
      maxHp: 80,
      attack: 12,
      defense: 3,
      speed: 9,
      mana: 100,
      maxMana: 100,
    };
    super(name, stats, 'Mage');
  }

  protected levelUp(): void {
    this.level++;
    this.experience = 0;

    this.maxHp += 15;
    this.hp = this.maxHp;
    this.maxMana += 20;
    this.mana = this.maxMana;
    this.attack += 3;
    this.defense += 1;
    this.speed += 2;

    console.log(`\n🎉 ${this.name} monte au niveau ${this.level} !`);
    console.log(`Stats améliorées : HP+15, MANA+20, ATK+3, DEF+1, SPD+2\n`);
  }

  protected getAvailableActions(): string[] {
    const actions = ['⚔️  Attaque normale'];

    if (this.mana >= 30) {
      actions.push('🔮 Boule de feu (30 mana, ignore DEF)');
    } else {
      actions.push('🔮 Boule de feu (30 mana) - PAS ASSEZ DE MANA');
    }

    if (this.mana >= 50) {
      actions.push('⚡ Éclair de foudre (50 mana, 2x dégâts magiques)');
    } else {
      actions.push('⚡ Éclair de foudre (50 mana) - PAS ASSEZ DE MANA');
    }

    return actions;
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
      case 1: // Boule de feu
        if (this.mana >= 30) {
          await this.fireball(enemies);
        } else {
          console.log('❌ Pas assez de mana !');
        }
        break;
      case 2: // Éclair de foudre
        if (this.mana >= 50) {
          await this.lightning(enemies);
        } else {
          console.log('❌ Pas assez de mana !');
        }
        break;
    }
  }

  private async normalAttack(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target) {
      console.log(`${this.name} attaque ${target.getName()} avec son bâton !`);
      target.takeDamage(this.attack);
    }
  }

  private async fireball(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target && this.consumeMana(30)) {
      const magicDamage = Math.floor(this.attack * 1.5);
      console.log(
        `${this.name} lance une Boule de Feu sur ${target.getName()} ! (-30 mana)`
      );
      target.takeDamage(magicDamage, true); // Ignore la défense
    }
  }

  private async lightning(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target && this.consumeMana(50)) {
      const magicDamage = Math.floor(this.attack * 2);
      console.log(
        `${this.name} invoque un Éclair de Foudre sur ${target.getName()} ! (-50 mana)`
      );
      target.takeDamage(magicDamage, true); // Ignore la défense
    }
  }
}
