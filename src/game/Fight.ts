import { Character } from '../models/Character.ts';
import { Adventurer } from '../models/Adventurer.ts';
import { Monster } from '../models/Monster.ts';
import { Party } from '../models/Party.ts';

/**
 * Classe gérant les combats entre deux équipes
 * Implémente un système de tour par tour basé sur la vitesse avec actions polymorphes
 */
export class Fight {
  private teamA: Character[];
  private teamB: Character[];
  private turnOrder: Character[];
  private currentTurn: number;
  private party: Party;

  constructor(party: Party, enemies: Character[]) {
    this.party = party;
    this.teamA = party.getMembers();
    this.teamB = enemies;
    this.turnOrder = [];
    this.currentTurn = 0;
  }

  /**
   * Démarre le combat et gère la boucle principale (ASYNCHRONE)
   */
  public async start(): Promise<void> {
    console.log('\n⚔️  LE COMBAT COMMENCE ! ⚔️\n');
    this.prepareAdventurers();
    this.displayTeams();
    this.sortBySpeed();
    this.displayTurnOrder();

    // Boucle de combat asynchrone
    while (!this.checkVictory()) {
      await this.executeTurn();
    }

    this.announceWinner();
  }

  private prepareAdventurers(): void {
    const inventory = this.party.getInventory();
    this.teamA.forEach((member) => {
      if (member instanceof Adventurer) {
        member.setInventory(inventory);
      }
    });
  }

  /**
   * Trie tous les participants par vitesse (décroissant)
   */
  private sortBySpeed(): void {
    this.turnOrder = [...this.teamA, ...this.teamB].sort(
      (a, b) => b.getSpeed() - a.getSpeed()
    );
  }

  /**
   * Affiche l'ordre des tours
   */
  private displayTurnOrder(): void {
    console.log('📋 Ordre des tours (basé sur la vitesse) :');
    this.turnOrder.forEach((character, index) => {
      console.log(`   ${index + 1}. ${character.getName()} (SPD: ${character.getSpeed()})`);
    });
    console.log('');
  }

  /**
   * Affiche les deux équipes
   */
  private displayTeams(): void {
    console.log('🔵 Équipe A :');
    this.teamA.forEach((char) => {
      console.log(`   - ${char.getName()} (HP: ${char.getHp()})`);
    });

    console.log('\n🔴 Équipe B :');
    this.teamB.forEach((char) => {
      console.log(`   - ${char.getName()} (HP: ${char.getHp()})`);
    });
    console.log('');
  }

  /**
   * Exécute le tour d'un personnage (POLYMORPHE & ASYNCHRONE)
   */
  private async executeTurn(): Promise<void> {
    const attacker = this.turnOrder[this.currentTurn];

    // Vérifier si l'attaquant est encore en vie
    if (!attacker.isAlive()) {
      this.nextTurn();
      return;
    }

    // Déterminer l'équipe alliée et ennemie
    const allies = this.getAllyTeam(attacker);
    const enemies = this.getEnemyTeam(attacker);

    const aliveEnemies = this.getAliveCharacters(enemies);
    if (aliveEnemies.length === 0) {
      return; // Le combat est terminé
    }

    // Appel polymorphe : le personnage exécute son action
    // Si c'est un Adventurer → menu interactif
    // Si c'est un Monster → IA automatique
    await attacker.performAction(allies, enemies);

    this.nextTurn();
  }

  /**
   * Passe au tour suivant (gestion circulaire)
   */
  private nextTurn(): void {
    this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
  }

  /**
   * Retourne l'équipe ennemie d'un personnage
   */
  private getEnemyTeam(character: Character): Character[] {
    return this.teamA.includes(character) ? this.teamB : this.teamA;
  }

  /**
   * Retourne l'équipe alliée d'un personnage
   */
  private getAllyTeam(character: Character): Character[] {
    return this.teamA.includes(character) ? this.teamA : this.teamB;
  }

  /**
   * Retourne les personnages vivants d'une équipe
   */
  private getAliveCharacters(team: Character[]): Character[] {
    return team.filter((char) => char.isAlive());
  }

  /**
   * Vérifie si une équipe a gagné
   * @returns true si le combat est terminé
   */
  private checkVictory(): boolean {
    const teamAAlive = this.getAliveCharacters(this.teamA).length > 0;
    const teamBAlive = this.getAliveCharacters(this.teamB).length > 0;

    return !teamAAlive || !teamBAlive;
  }

  /**
   * Annonce le vainqueur et distribue les récompenses
   */
  private announceWinner(): void {
    const teamAAlive = this.getAliveCharacters(this.teamA).length > 0;

    if (teamAAlive) {
      console.log('\n🎉 VICTOIRE ! L\'équipe A a gagné ! 🎉\n');
      this.distributeRewards();
    } else {
      console.log('\n💀 DÉFAITE ! L\'équipe B a gagné ! 💀\n');
    }
  }

  /**
   * Distribue les récompenses aux joueurs de l'équipe gagnante
   */
  private distributeRewards(): void {
    // Calculer le butin total des monstres vaincus
    let totalGold = 0;
    let totalExp = 0;

    this.teamB.forEach((char) => {
      if (!char.isAlive() && char instanceof Monster) {
        const loot = char.getLoot();
        totalGold += loot.gold;
        totalExp += loot.experience;
      }
    });

    // Distribuer aux aventuriers vivants
    const aliveAdventurers = this.getAliveCharacters(this.teamA).filter(
      (char) => char instanceof Adventurer
    ) as Adventurer[];

    if (aliveAdventurers.length > 0) {
      const expPerPlayer = Math.floor(totalExp / aliveAdventurers.length);

      console.log('💰 Récompenses :');
      console.log(`   Or total : ${totalGold}`);
      console.log(`   Expérience par aventurier : ${expPerPlayer}\n`);

      aliveAdventurers.forEach((adventurer) => {
        adventurer.gainExperience(expPerPlayer);
      });
    }
  }
}
