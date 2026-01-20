import { Character } from './Character.ts';
import { CharacterStats } from '../interfaces/CharacterStats.ts';
import { Menu } from '../utils/Menu.ts';
import { Inventory } from './Inventory.ts';

/**
 * Classe de base pour tous les aventuriers jouables
 * Contient la gestion du niveau, de l'expérience et du menu d'action
 */
export abstract class Adventurer extends Character {
  protected level: number;
  protected experience: number;
  protected menu: Menu;
  protected className: string;
  protected inventory: Inventory | null;

  constructor(_name: string, stats: CharacterStats, className: string) {
    super(stats);
    this.level = 1;
    this.experience = 0;
    this.menu = new Menu();
    this.className = className;
    this.inventory = null;
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
  protected abstract levelUp(): void;

  /**
   * Calcule l'expérience nécessaire pour le prochain niveau
   */
  protected getExpForNextLevel(): number {
    return this.level * 100;
  }

  /**
   * Accesseurs
   */
  public getLevel(): number {
    return this.level;
  }

  public getExperience(): number {
    return this.experience;
  }

  public getClassName(): string {
    return this.className;
  }

  public setInventory(inventory: Inventory): void {
    this.inventory = inventory;
  }

  /**
   * Affiche les statistiques complètes du joueur
   */
  public displayFullStats(): void {
    console.log(`\n=== ${this.name} - ${this.className} (Niveau ${this.level}) ===`);
    console.log(`HP: ${this.hp}/${this.maxHp}`);
    if (this.maxMana > 0) {
      console.log(`Mana: ${this.mana}/${this.maxMana}`);
    }
    console.log(`Attaque: ${this.attack}`);
    console.log(`Défense: ${this.defense}`);
    console.log(`Vitesse: ${this.speed}`);
    console.log(`Expérience: ${this.experience}/${this.getExpForNextLevel()}`);
    console.log(`===============================\n`);
  }

  /**
   * Méthode abstraite pour obtenir les actions disponibles
   */
  protected abstract getAvailableActions(): string[];

  /**
   * Méthode abstraite pour exécuter une action choisie
   */
  protected abstract executeAction(
    actionIndex: number,
    allies: Character[],
    enemies: Character[]
  ): Promise<void>;

  /**
   * Implémentation de performAction pour les aventuriers (avec menu)
   */
  public async performAction(allies: Character[], enemies: Character[]): Promise<void> {
    const baseActions = this.getAvailableActions();
    const actions = [...baseActions];

    // Option d'utilisation d'objet si l'inventaire est disponible et non vide
    if (this.inventory && !this.inventory.isEmpty()) {
      actions.push('🎒 Utiliser un objet');
    }
    console.log(`\n--- Tour de ${this.name} (${this.className}) ---`);
    this.displayCurrentStats();

    const choice = await this.menu.selectOption(actions);

    // Dernière option : utilisation d'un objet
    if (choice === actions.length - 1 && actions[actions.length - 1] === '🎒 Utiliser un objet') {
      await this.useItem(allies);
      return;
    }

    await this.executeAction(choice, allies, enemies);
  }

  /**
   * Affiche les stats actuelles pendant le combat
   */
  protected displayCurrentStats(): void {
    let statsStr = `HP: ${this.hp}/${this.maxHp}`;
    if (this.maxMana > 0) {
      statsStr += ` | Mana: ${this.mana}/${this.maxMana}`;
    }
    console.log(statsStr);
  }

  /**
   * Sélectionne une cible parmi les ennemis vivants
   */
  protected async selectTarget(enemies: Character[]): Promise<Character | null> {
    const aliveEnemies = enemies.filter((e) => e.isAlive());
    if (aliveEnemies.length === 0) return null;

    if (aliveEnemies.length === 1) {
      return aliveEnemies[0];
    }

    const options = aliveEnemies.map(
      (e) => `${e.getName()} (HP: ${e.getHp()}/${e.getMaxHp()})`
    );
    const choice = await this.menu.selectOption(options);
    return aliveEnemies[choice];
  }

  /**
   * Sélectionne un allié
   */
  protected async selectAlly(allies: Character[], allowDead: boolean = false): Promise<Character | null> {
    const candidates = allowDead ? allies : allies.filter((a) => a.isAlive());
    if (candidates.length === 0) return null;

    if (candidates.length === 1) {
      return candidates[0];
    }

    const options = candidates.map(
      (a) => `${a.getName()} (HP: ${a.getHp()}/${a.getMaxHp()})`
    );
    const choice = await this.menu.selectOption(options);
    return candidates[choice];
  }

  /**
   * Permet d'utiliser un objet de l'inventaire sur un allié (ou soi-même)
   */
  private async useItem(allies: Character[]): Promise<void> {
    if (!this.inventory || this.inventory.isEmpty()) {
      console.log('🎒 Inventaire vide.');
      return;
    }

    const items = this.inventory.listItems();
    const itemOptions = items.map((item, index) => `${index + 1}. ${item.name} - ${item.description}`);
    console.log('\n🎒 Inventaire :');
    itemOptions.forEach((opt) => console.log(`   ${opt}`));

    const itemIndex = await this.menu.askNumber('Choisissez un objet : ', 1, items.length);
    const item = items[itemIndex - 1];

    const allowDeadTarget = item.name === 'Demi-étoile';
    const target = await this.selectAlly(allies, allowDeadTarget);
    if (!target) {
      console.log('❌ Aucun allié valide.');
      return;
    }

    const result = item.use(target);
    console.log(result);
    this.inventory.removeItem(itemIndex - 1);
  }
}
