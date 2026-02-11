import { Adventurer } from '../Adventurer.ts';
import { Character } from '../Character.ts';
import { CharacterStats } from '../../interfaces/CharacterStats.ts';

/**
 * Classe Barbare : Attaque Berserk (130% de dégâts, mais perd 20% de ses propres PV)
 */
export class Barbarian extends Adventurer {
  constructor(name: string) {
    const stats: CharacterStats = {
      name: name,
      hp: 140,
      maxHp: 140,
      attack: 20,
      defense: 5,
      speed: 6,
      mana: 0,
      maxMana: 0,
    };
    super(name, stats, 'Barbare');
  }

  protected levelUp(): void {
    this.level++;
    this.experience = 0;

    this.maxHp += 30;
    this.hp = this.maxHp;
    this.attack += 5;
    this.defense += 1;
    this.speed += 1;

    console.log(`\n🎉 ${this.name} monte au niveau ${this.level} !`);
    console.log(`Stats améliorées : HP+30, ATK+5, DEF+1, SPD+1\n`);
  }

  protected getAvailableActions(): string[] {
    return [
      '⚔️  Attaque normale',
      '💢 Rage Berserk (130% ATK, coûte 20% HP)',
      '🩸 Soif de sang (Attaque + vol 30% des dégâts)',
    ];
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
      case 1: // Rage Berserk
        await this.berserkRage(ennemis);
        break;
      case 2: // Soif de sang
        await this.bloodlust(ennemis);
        break;
    }
  }

  private async normalAttack(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      console.log(`${this.name} attaque sauvagement ${cible.getName()} !`);
      cible.takeDamage(this.attack);
    }
  }

  private async berserkRage(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      const hpCost = Math.floor(this.maxHp * 0.2);
      const degatsBase = Math.max(1, this.attack - cible.getDefense());
      const degatsBerserk = Math.floor(baseDamage * 1.3);

      console.log(`${this.name} entre en Rage Berserk ! (Coût: ${hpCost} HP)`);
      this.takeTrueDamage(hpCost);

      if (this.isAlive()) {
        console.log(`${this.name} frappe ${cible.getName()} avec une force déchaînée !`);
        cible.takeTrueDamage(degatsBerserk);
      } else {
        console.log(`${this.name} s'est infligé trop de dégâts et s'effondre !`);
      }
    }
  }

  private async bloodlust(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      const initialTargetHp = cible.getHp();
      console.log(`${this.name} attaque ${cible.getName()} avec Soif de Sang !`);
      cible.takeDamage(this.attack);

      const damageDealt = initialTargetHp - cible.getHp();
      const lifeSteal = Math.floor(damageDealt * 0.3);

      if (lifeSteal > 0) {
        this.hp = Math.min(this.maxHp, this.hp + lifeSteal);
        console.log(`${this.name} vole ${lifeSteal} HP ! (HP: ${this.hp}/${this.maxHp})`);
      }
    }
  }
}
