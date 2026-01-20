/**
 * Interface définissant les statistiques de base d'un personnage
 */
export interface CharacterStats {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  mana?: number;
  maxMana?: number;
}
