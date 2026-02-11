import { Menu } from '../utils/Menu.ts';
import { Adventurer } from '../models/Adventurer.ts';
import { Warrior } from '../models/classes/Warrior.ts';
import { Mage } from '../models/classes/Mage.ts';
import { Paladin } from '../models/classes/Paladin.ts';
import { Barbarian } from '../models/classes/Barbarian.ts';
import { Priest } from '../models/classes/Priest.ts';
import { Rogue } from '../models/classes/Rogue.ts';
import { Party } from '../models/Party.ts';
import { Inventory } from '../models/Inventory.ts';
import { CombatRoom } from '../dungeon/CombatRoom.ts';
import { TreasureRoom } from '../dungeon/TreasureRoom.ts';
import { BossRoom } from '../dungeon/BossRoom.ts';

/**
 * Gestionnaire principal du jeu
 * Gère le flux du jeu, le menu principal et les combats
 */
export class GameManager {
  private menu: Menu;
  private party: Party | null;

  constructor() {
    this.menu = new Menu();
    this.party = null;
  }

  public async start(): Promise<void> {
    this.menu.displayTitle('⚔️  RPG CLI - Bienvenue ! ⚔️');
    await this.createParty();

    if (!this.party || this.party.getMembers().length === 0) {
      console.log('❌ Impossible de démarrer l\'aventure.');
      return;
    }

    await this.dungeonRun();
  }

  private async createParty(): Promise<void> {
    const adventurers: Adventurer[] = [];

    console.log('\n🎭 Vous devez choisir 3 aventuriers pour votre groupe.\n');

    for (let i = 1; i <= 3; i++) {
      console.log(`\n=== Aventurier ${i}/3 ===`);
      const name = await this.menu.ask(`Nom de l'aventurier ${i} : `);
      const heroName = name || `Aventurier ${i}`;

      this.menu.displayTitle('CHOISISSEZ VOTRE CLASSE');

      const classes = [
        '⚔️  Guerrier - Équilibré, haute défense',
        '🔮 Mage - Attaques magiques, faible défense',
        '✨ Paladin - Attaques de zone sacrées',
        '💢 Barbare - Puissant mais risqué',
        '✝️  Prêtre - Soutien et soins',
        '🗡️  Voleur - Rapide, peut voler',
      ];

      const choice = await this.menu.selectOption(classes);

      let adventurer: Adventurer;
      switch (choice) {
        case 0:
          adventurer = new Warrior(heroName);
          break;
        case 1:
          adventurer = new Mage(heroName);
          break;
        case 2:
          adventurer = new Paladin(heroName);
          break;
        case 3:
          adventurer = new Barbarian(heroName);
          break;
        case 4:
          adventurer = new Priest(heroName);
          break;
        case 5:
          adventurer = new Rogue(heroName);
          break;
        default:
          adventurer = new Warrior(heroName);
      }

      adventurers.push(adventurer);
      console.log(
        `\n✨ ${adventurer.getName()} le ${adventurer.getClassName()} rejoint le groupe !\n`
      );
      adventurer.displayFullStats();
    }

    this.party = new Party(adventurers, new Inventory());
    console.log('\n🎉 Votre équipe est complète !\n');
    await this.menu.pressEnterToContinue();
  }

  /**
   * Menu principal du jeu
   */
  private async dungeonRun(): Promise<void> {
    if (!this.party) return;

    const rooms = [
      new CombatRoom(),
      new TreasureRoom(),
      new CombatRoom(),
      new TreasureRoom(),
      new BossRoom(),
    ];

    console.log('\n🚶 Début de l\'exploration du donjon !');

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      console.log(`\n===== Salle ${i + 1}/${rooms.length} =====`);
      const success = await room.enter(this.party);

      if (!success || this.party.isWiped()) {
        console.log('\n💀 Votre aventure s\'arrête ici...');
        this.exitGame();
        return;
      }

      await this.menu.pressEnterToContinue();
    }

    console.log('\n🏅 Félicitations ! Vous avez vaincu le donjon et le boss final.');
    this.exitGame();
  }

  /**
   * Quitte le jeu
   */
  private exitGame(): void {
    console.log('\n👋 Merci d\'avoir joué ! À bientôt !\n');
    this.menu.close();
    const deno = (globalThis as { Deno?: { exit: (code: number) => void } }).Deno;
    deno?.exit(0);
  }
}
