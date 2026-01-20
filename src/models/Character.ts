import { CharacterStats } from '../interfaces/CharacterStats.ts';

/**
 * Classe abstraite représentant un personnage générique
 * Tous les combattants (Player, Monster) héritent de cette classe
 */
export abstract class Character {
  protected name: string;
  protected hp: number;
  protected maxHp: number;
  protected attack: number;
  protected defense: number;
  protected speed: number;
  protected mana: number;
  protected maxMana: number;

  constructor(stats: CharacterStats) {
    this.name = stats.name;
    this.hp = stats.hp;
    this.maxHp = stats.maxHp;
    this.attack = stats.attack;
    this.defense = stats.defense;
    this.speed = stats.speed;
    this.mana = stats.mana || 0;
    this.maxMana = stats.maxMana || 0;
  }

  /**
   * Méthode abstraite : chaque classe doit définir son action de combat
   * @param allies Les alliés du personnage
   * @param enemies Les ennemis du personnage
   * @returns Promise<void> pour gérer les actions asynchrones
   */
  public abstract performAction(allies: Character[], enemies: Character[]): Promise<void>;

  /**
   * Inflige des dégâts au personnage
   * @param amount Montant des dégâts bruts
   * @param ignoreDefense Si true, ignore la défense
   */
  public takeDamage(amount: number, ignoreDefense: boolean = false): void {
    const damage = ignoreDefense ? amount : Math.max(1, amount - this.defense);
    this.setHp(this.hp - damage);
    console.log(`${this.name} reçoit ${damage} dégâts ! (HP: ${this.hp}/${this.maxHp})`);
  }

  /**
   * Inflige des dégâts directs (bypass la défense)
   * @param amount Montant des dégâts
   */
  public takeTrueDamage(amount: number): void {
    this.setHp(this.hp - amount);
    console.log(`${this.name} subit ${amount} dégâts purs ! (HP: ${this.hp}/${this.maxHp})`);
  }

  /**
   * Soigne le personnage d'un pourcentage de ses HP max
   * @param percent Pourcentage de soin (0-100)
   */
  public heal(percent: number): void {
    const healAmount = Math.floor((this.maxHp * percent) / 100);
    const oldHp = this.hp;
    this.setHp(this.hp + healAmount);
    const actualHeal = this.hp - oldHp;
    console.log(`${this.name} récupère ${actualHeal} HP ! (HP: ${this.hp}/${this.maxHp})`);
  }

  /**
   * Attaque une cible
   * @param target La cible à attaquer
   */
  public attackTarget(target: Character): void {
    console.log(`${this.name} attaque ${target.getName()} !`);
    target.takeDamage(this.attack);
  }

  /**
   * Vérifie si le personnage est encore en vie
   * @returns true si hp > 0
   */
  public isAlive(): boolean {
    return this.hp > 0;
  }

  /**
   * Retourne les statistiques actuelles du personnage
   */
  public getStats(): CharacterStats {
    return {
      name: this.name,
      hp: this.hp,
      maxHp: this.maxHp,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
    };
  }

  /**
   * Accesseurs publics
   */
  public getName(): string {
    return this.name;
  }

  public getHp(): number {
    return this.hp;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public isDead(): boolean {
    return this.hp === 0;
  }

  public getMaxHp(): number {
    return this.maxHp;
  }

  public getMana(): number {
    return this.mana;
  }

  public getMaxMana(): number {
    return this.maxMana;
  }

  /**
   * Soigne d'un montant fixe en clampant au maximum
   */
  public restoreHp(amount: number): void {
    this.setHp(this.hp + amount);
    console.log(`${this.name} récupère ${amount} HP (HP: ${this.hp}/${this.maxHp})`);
  }

  /**
   * Restaure un pourcentage de mana max
   */
  public recoverManaPercent(percent: number): void {
    const amount = Math.floor((this.maxMana * percent) / 100);
    this.setMana(this.mana + amount);
    console.log(`${this.name} récupère ${amount} mana (Mana: ${this.mana}/${this.maxMana})`);
  }

  /**
   * Ressuscite le personnage si KO en le soignant à un pourcentage de ses HP max
   */
  public revive(percentOfMax: number): void {
    if (!this.isDead()) return;
    const reviveHp = Math.max(1, Math.floor((this.maxHp * percentOfMax) / 100));
    this.setHp(reviveHp);
    console.log(`${this.name} est ressuscité avec ${reviveHp} HP !`);
  }

  /**
   * Modifie les HP en appliquant un clamp entre 0 et maxHp
   */
  protected setHp(value: number): void {
    this.hp = Math.max(0, Math.min(this.maxHp, value));
  }

  public getAttack(): number {
    return this.attack;
  }

  public getDefense(): number {
    return this.defense;
  }

  /**
   * Consomme du mana
   * @param amount Quantité de mana à consommer
   * @returns true si le mana était suffisant
   */
  protected consumeMana(amount: number): boolean {
    if (this.mana >= amount) {
      this.mana -= amount;
      return true;
    }
    return false;
  }

  /**
   * Restaure du mana
   * @param amount Quantité de mana à restaurer
   */
  protected restoreMana(amount: number): void {
    this.setMana(this.mana + amount);
  }

  /**
   * Modifie le mana en appliquant un clamp entre 0 et maxMana
   */
  protected setMana(value: number): void {
    this.mana = Math.max(0, Math.min(this.maxMana, value));
  }
}
