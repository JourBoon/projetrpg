import { Adventurer } from '../Adventurer.ts';
import { Character } from '../Character.ts';
import { CharacterStats } from '../../interfaces/CharacterStats.ts';
import { Potion } from '../items/Potion.ts';
import { Ether } from '../items/Ether.ts';
import { StarFragment } from '../items/StarFragment.ts';
import { HalfStar } from '../items/HalfStar.ts';

export class Rogue extends Adventurer {
  constructor(name: string) {
    const stats: CharacterStats = {
      name: name,
      hp: 95,
      maxHp: 95,
      attack: 14,
      defense: 4,
      speed: 14,
      mana: 0,
      maxMana: 0,
    };
    super(name, stats, 'Voleur');
  }

  protected levelUp(): void {
    this.level++;
    this.experience = 0;

    this.maxHp += 18;
    this.hp = this.maxHp;
    this.attack += 3;
    this.defense += 1;
    this.speed += 2;

    console.log(`\n🎉 ${this.name} monte au niveau ${this.level} !`);
    console.log(`Stats améliorées : HP+18, ATK+3, DEF+1, SPD+2\n`);
  }

  protected getAvailableActions(): string[] {
    return [
      '⚔️  Attaque normale',
      '🗡️  Attaque sournoise (2x dégâts si vitesse > cible)',
      '💰 Voler (40% rien, 30% Potion, 15% Fragment, 10% Ether, 5% Demi-étoile)',
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
      case 1: // Attaque sournoise
        await this.sneakAttack(ennemis);
        break;
      case 2: // Voler
        await this.steal(ennemis);
        break;
    }
  }

  private async normalAttack(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      console.log(`${this.name} attaque ${cible.getName()} avec ses dagues !`);
      cible.takeDamage(this.attack);
    }
  }

  private async sneakAttack(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      const isFasterThanTarget = this.speed > cible.getSpeed();

      if (isFasterThanTarget) {
        const degatsSournois = this.attack * 2;
        console.log(
          `${this.name} utilise Attaque Sournoise sur ${cible.getName()} ! (Avantage de vitesse : 2x dégâts)`
        );
        cible.takeDamage(degatsSournois);
      } else {
        console.log(
          `${this.name} tente une Attaque Sournoise sur ${cible.getName()}, mais la cible est trop rapide !`
        );
        cible.takeDamage(this.attack); // Dégâts normaux
      }
    }
  }

  private async steal(ennemis: Character[]): Promise<void> {
    const cible = await this.selectTarget(ennemis);
    if (cible) {
      console.log(`${this.name} tente de voler ${cible.getName()} !`);

      const tirage = Math.random();
      
      if (tirage < 0.05) {
        const item = new HalfStar();
        if (this.inventory) {
          this.inventory.addItem(item);
          console.log(`💎 ${this.name} a volé une ${item.name} !`);
        }
      } else if (tirage < 0.15) {
        const item = new Ether();
        if (this.inventory) {
          this.inventory.addItem(item);
          console.log(`💎 ${this.name} a volé un ${item.name} !`);
        }
      } else if (tirage < 0.30) {
        const item = new StarFragment();
        if (this.inventory) {
          this.inventory.addItem(item);
          console.log(`💎 ${this.name} a volé un ${item.name} !`);
        }
      } else if (tirage < 0.60) {
        const item = new Potion();
        if (this.inventory) {
          this.inventory.addItem(item);
          console.log(`💎 ${this.name} a volé une ${item.name} !`);
        }
      } else {
        console.log(`❌ ${this.name} n'a rien pu voler...`);
      }
    }
  }
}
