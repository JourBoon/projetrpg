import { Character } from './Character.ts';
import { CharacterStats } from '../interfaces/CharacterStats.ts';
import { Menu } from '../utils/Menu.ts';
import { Inventory } from './Inventory.ts';

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

  public gainExperience(montant: number): void {
    this.experience += montant;
    console.log(`${this.name} gagne ${montant} XP ! (Total: ${this.experience})`);

    const expNeeded = this.getExpForNextLevel();
    if (this.experience >= expNeeded) {
      this.levelUp();
    }
  }

  protected abstract levelUp(): void;

  protected getExpForNextLevel(): number {
    return this.level * 100;
  }
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

  protected abstract getAvailableActions(): string[];

  protected abstract executeAction(
    actionIndex: number,
    allies: Character[],
    ennemis: Character[]
  ): Promise<void>;

  public async performAction(allies: Character[], ennemis: Character[]): Promise<void> {
    const baseActions = this.getAvailableActions();
    const actions = [...baseActions];

    if (this.inventory && !this.inventory.isEmpty()) {
      actions.push('🎒 Utiliser un objet');
    }
    console.log(`\n--- Tour de ${this.name} (${this.className}) ---`);
    this.displayCurrentStats();

    const choix = await this.menu.selectOption(actions);

    if (choix === actions.length - 1 && actions[actions.length - 1] === '🎒 Utiliser un objet') {
      await this.useItem(allies);
      return;
    }

    await this.executeAction(choix, allies, ennemis);
  }

  protected displayCurrentStats(): void {
    let statsStr = `HP: ${this.hp}/${this.maxHp}`;
    if (this.maxMana > 0) {
      statsStr += ` | Mana: ${this.mana}/${this.maxMana}`;
    }
    console.log(statsStr);
  }

  protected async selectTarget(ennemis: Character[]): Promise<Character | null> {
    const ennemisVivants = ennemis.filter((e) => e.isAlive());
    if (ennemisVivants.length === 0) return null;

    if (ennemisVivants.length === 1) {
      return ennemisVivants[0];
    }

    const options = ennemisVivants.map(
      (e) => `${e.getName()} (HP: ${e.getHp()}/${e.getMaxHp()})`
    );
    const choix = await this.menu.selectOption(options);
    return ennemisVivants[choix];
  }

  protected async selectAlly(allies: Character[], allowDead: boolean = false): Promise<Character | null> {
    const candidats = allowDead ? allies : allies.filter((a) => a.isAlive());
    if (candidats.length === 0) return null;

    if (candidats.length === 1) {
      return candidats[0];
    }

    const options = candidats.map(
      (a) => `${a.getName()} (HP: ${a.getHp()}/${a.getMaxHp()})`
    );
    const choix = await this.menu.selectOption(options);
    return candidats[choix];
  }
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

    const allowDeadTarget = item.name.includes('étoile');
    const cible = await this.selectAlly(allies, allowDeadTarget);
    if (!cible) {
      console.log('❌ Aucun allié valide.');
      return;
    }

    const result = item.use(cible);
    console.log(result);
    this.inventory.removeItem(itemIndex - 1);
  }
}
