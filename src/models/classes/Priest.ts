import { Adventurer } from '../Adventurer.ts';
import { Character } from '../Character.ts';
import { CharacterStats } from '../../interfaces/CharacterStats.ts';

/**
 * Classe Prêtre : Action de Soin (restaure 25% des PV d'un allié)
 */
export class Priest extends Adventurer {
  constructor(name: string) {
    const stats: CharacterStats = {
      name: name,
      hp: 90,
      maxHp: 90,
      attack: 10,
      defense: 6,
      speed: 8,
      mana: 120,
      maxMana: 120,
    };
    super(name, stats, 'Prêtre');
  }

  protected levelUp(): void {
    this.level++;
    this.experience = 0;

    this.maxHp += 18;
    this.hp = this.maxHp;
    this.maxMana += 25;
    this.mana = this.maxMana;
    this.attack += 2;
    this.defense += 2;
    this.speed += 1;

    console.log(`\n🎉 ${this.name} monte au niveau ${this.level} !`);
    console.log(`Stats améliorées : HP+18, MANA+25, ATK+2, DEF+2, SPD+1\n`);
  }

  protected getAvailableActions(): string[] {
    const actions = ['⚔️  Attaque normale'];

    if (this.mana >= 20) {
      actions.push('✨ Soin (20 mana, restaure 25% HP d\'un allié)');
    } else {
      actions.push('✨ Soin (20 mana) - PAS ASSEZ DE MANA');
    }

    if (this.mana >= 40) {
      actions.push('🌟 Soin de groupe (40 mana, 15% HP à tous les alliés)');
    } else {
      actions.push('🌟 Soin de groupe (40 mana) - PAS ASSEZ DE MANA');
    }

    if (this.mana >= 30) {
      actions.push('🔆 Lumière Sacrée (30 mana, dégâts magiques)');
    } else {
      actions.push('🔆 Lumière Sacrée (30 mana) - PAS ASSEZ DE MANA');
    }

    return actions;
  }

  protected async executeAction(
    actionIndex: number,
    allies: Character[],
    ennemis: Character[]
  ): Promise<void> {
    switch (actionIndex) {
      case 0: // Attaque normale
        await this.normalAttack(ennemis);
        break;
      case 1: // Soin
        if (this.mana >= 20) {
          await this.healAlly(allies);
        } else {
          console.log('❌ Pas assez de mana !');
        }
        break;
      case 2: // Soin de groupe
        if (this.mana >= 40) {
          await this.groupHeal(allies);
        } else {
          console.log('❌ Pas assez de mana !');
        }
        break;
      case 3: // Lumière Sacrée
        if (this.mana >= 30) {
          await this.holyLight(ennemis);
        } else {
          console.log('❌ Pas assez de mana !');
        }
        break;
    }
  }

  private async normalAttack(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      console.log(`${this.name} frappe ${cible.getName()} avec son marteau !`);
      cible.takeDamage(this.attack);
    }
  }

  private async healAlly(allies: Character[]): Promise<void> {
    const cible = await this.selectAlly(allies);
    if (cible && this.consumeMana(20)) {
      console.log(`${this.name} lance un Soin sur ${cible.getName()} ! (-20 mana)`);
      cible.heal(25);
    }
  }

  private async groupHeal(allies: Character[]): Promise<void> {
    if (this.consumeMana(40)) {
      console.log(`${this.name} invoque un Soin de Groupe ! (-40 mana)`);
      const alliesVivants = allies.filter((a) => a.isAlive());
      alliesVivants.forEach((ally) => {
        console.log(`  → ${ally.getName()} est soigné !`);
        ally.heal(15);
      });
    }
  }

  private async holyLight(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible && this.consumeMana(30)) {
      const degatsMagiques = Math.floor(this.attack * 1.8);
      console.log(
        `${this.name} invoque la Lumière Sacrée sur ${cible.getName()} ! (-30 mana)`
      );
      cible.takeDamage(degatsMagiques, true); // Ignore la défense
    }
  }
}
