import { Adventurer } from '../Adventurer.ts';
import { Character } from '../Character.ts';
import { CharacterStats } from '../../interfaces/CharacterStats.ts';

/**
 * Interface pour le butin volé
 */
interface StolenLoot {
  gold: number;
  item: string | null;
}

/**
 * Classe Voleur : Grande vitesse, action Voler avec probabilités de butin
 */
export class Rogue extends Adventurer {
  private stolenGold: number;
  private stolenItems: string[];

  constructor(name: string) {
    const stats: CharacterStats = {
      name: name,
      hp: 95,
      maxHp: 95,
      attack: 14,
      defense: 4,
      speed: 14, // Très rapide
      mana: 0,
      maxMana: 0,
    };
    super(name, stats, 'Voleur');
    this.stolenGold = 0;
    this.stolenItems = [];
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
      '💰 Voler (chance de butin : Potion 30%, Éther 10%, Or)',
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
      case 1: // Attaque sournoise
        await this.sneakAttack(enemies);
        break;
      case 2: // Voler
        await this.steal(enemies);
        break;
    }
  }

  private async normalAttack(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target) {
      console.log(`${this.name} attaque ${target.getName()} avec ses dagues !`);
      target.takeDamage(this.attack);
    }
  }

  private async sneakAttack(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target) {
      const isFasterThanTarget = this.speed > target.getSpeed();

      if (isFasterThanTarget) {
        const sneakDamage = this.attack * 2;
        console.log(
          `${this.name} utilise Attaque Sournoise sur ${target.getName()} ! (Avantage de vitesse : 2x dégâts)`
        );
        target.takeDamage(sneakDamage);
      } else {
        console.log(
          `${this.name} tente une Attaque Sournoise sur ${target.getName()}, mais la cible est trop rapide !`
        );
        target.takeDamage(this.attack); // Dégâts normaux
      }
    }
  }

  private async steal(enemies: Character[]): Promise<void> {
    const target = await this.selectTarget(enemies);
    if (target) {
      console.log(`${this.name} tente de voler ${target.getName()} !`);

      const loot = this.attemptSteal();

      if (loot.item) {
        this.stolenItems.push(loot.item);
        console.log(`💎 ${this.name} a volé : ${loot.item} !`);
      }

      if (loot.gold > 0) {
        this.stolenGold += loot.gold;
        console.log(`💰 ${this.name} a volé ${loot.gold} pièces d'or !`);
      }

      if (!loot.item && loot.gold === 0) {
        console.log(`❌ ${this.name} n'a rien pu voler...`);
      }
    }
  }

  private attemptSteal(): StolenLoot {
    const loot: StolenLoot = {
      gold: 0,
      item: null,
    };

    // 30% de chances de voler une Potion
    if (Math.random() < 0.3) {
      loot.item = 'Potion de Soin';
      return loot;
    }

    // 10% de chances de voler un Éther
    if (Math.random() < 0.1) {
      loot.item = 'Éther (Mana)';
      return loot;
    }

    // 5% de chances de voler un objet rare
    if (Math.random() < 0.05) {
      loot.item = 'Gemme Précieuse';
      return loot;
    }

    // Sinon, voler de l'or (50-100 pièces)
    loot.gold = Math.floor(Math.random() * 51) + 50;

    return loot;
  }

  /**
   * Accesseurs pour le butin volé
   */
  public getStolenGold(): number {
    return this.stolenGold;
  }

  public getStolenItems(): string[] {
    return [...this.stolenItems];
  }

  public displayLoot(): void {
    console.log(`\n💰 Butin volé par ${this.name} :`);
    console.log(`   Or : ${this.stolenGold}`);
    if (this.stolenItems.length > 0) {
      console.log(`   Objets :`);
      this.stolenItems.forEach((item) => console.log(`      - ${item}`));
    } else {
      console.log(`   Objets : Aucun`);
    }
  }
}
