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
  private player: Adventurer | null;
  private party: Party | null;

  /**
   * Constructeur public
   */
  constructor() {
    this.menu = new Menu();
    this.player = null;
    this.party = null;
  }

  /**
   * Démarre le jeu
   */
  public async start(): Promise<void> {
    this.menu.displayTitle('⚔️  RPG CLI - Bienvenue ! ⚔️');
    await this.createPlayer();

    if (!this.player) {
      console.log('❌ Impossible de démarrer l\'aventure.');
      return;
    }

    this.party = new Party([this.player], new Inventory());
    await this.dungeonRun();
  }

  /**
   * Création du personnage du joueur
   */
  private async createPlayer(): Promise<void> {
    const name = await this.menu.ask('Entrez le nom de votre héros : ');
    const heroName = name || 'Aventurier';

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

    switch (choice) {
      case 0:
        this.player = new Warrior(heroName);
        break;
      case 1:
        this.player = new Mage(heroName);
        break;
      case 2:
        this.player = new Paladin(heroName);
        break;
      case 3:
        this.player = new Barbarian(heroName);
        break;
      case 4:
        this.player = new Priest(heroName);
        break;
      case 5:
        this.player = new Rogue(heroName);
        break;
      default:
        this.player = new Warrior(heroName);
    }

    console.log(
      `\n✨ ${this.player!.getName()} le ${this.player!.getClassName()} a été créé avec succès !\n`
    );
    this.player!.displayFullStats();
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
