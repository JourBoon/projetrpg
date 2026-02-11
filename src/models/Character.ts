import { CharacterStats } from '../interfaces/CharacterStats.ts';

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

  public abstract performAction(allies: Character[], ennemis: Character[]): Promise<void>;

  public takeDamage(montant: number, ignoreDefense: boolean = false): void {
    const degats = ignoreDefense ? montant : Math.max(1, montant - this.defense);
    this.setHp(this.hp - degats);
    console.log(`${this.name} reçoit ${degats} dégâts ! (HP: ${this.hp}/${this.maxHp})`);
  }

  public takeTrueDamage(montant: number): void {
    this.setHp(this.hp - montant);
    console.log(`${this.name} subit ${montant} dégâts purs ! (HP: ${this.hp}/${this.maxHp})`);
  }

  public heal(percent: number): void {
    const montantSoin = Math.floor((this.maxHp * percent) / 100);
    const anciensPv = this.hp;
    this.setHp(this.hp + montantSoin);
    const soinEffectif = this.hp - anciensPv;
    console.log(`${this.name} récupère ${soinEffectif} HP ! (HP: ${this.hp}/${this.maxHp})`);
  }

  public attackTarget(cible: Character): void {
    console.log(`${this.name} attaque ${cible.getName()} !`);
    cible.takeDamage(this.attack);
  }

  public isAlive(): boolean {
    return this.hp > 0;
  }

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

  public restoreHp(montant: number): void {
    this.setHp(this.hp + montant);
    console.log(`${this.name} récupère ${montant} HP (HP: ${this.hp}/${this.maxHp})`);
  }

  public recoverManaPercent(percent: number): void {
    const montant = Math.floor((this.maxMana * percent) / 100);
    this.setMana(this.mana + montant);
    console.log(`${this.name} récupère ${montant} mana (Mana: ${this.mana}/${this.maxMana})`);
  }

  public revive(percentOfMax: number): void {
    if (!this.isDead()) return;
    const pvReanimation = Math.max(1, Math.floor((this.maxHp * percentOfMax) / 100));
    this.setHp(pvReanimation);
    console.log(`${this.name} est ressuscité avec ${pvReanimation} HP !`);
  }

  protected setHp(value: number): void {
    this.hp = Math.max(0, Math.min(this.maxHp, value));
  }

  public getAttack(): number {
    return this.attack;
  }

  public getDefense(): number {
    return this.defense;
  }

  protected consumeMana(montant: number): boolean {
    if (this.mana >= montant) {
      this.mana -= montant;
      return true;
    }
    return false;
  }

  protected restoreMana(montant: number): void {
    this.setMana(this.mana + montant);
  }

  protected setMana(value: number): void {
    this.mana = Math.max(0, Math.min(this.maxMana, value));
  }
}
