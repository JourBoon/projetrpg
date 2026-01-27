import { Adventurer } from './Adventurer.ts';
import { Inventory } from './Inventory.ts';
import { Potion } from './items/Potion.ts';
import { Ether } from './items/Ether.ts';
import { StarFragment } from './items/StarFragment.ts';

export class Party {
  private members: Adventurer[];
  private inventory: Inventory;

  constructor(members: Adventurer[], inventory?: Inventory) {
    this.members = members;
    this.inventory = inventory ?? new Inventory();
    
    // Initialiser avec les objets de départ
    this.initializeStartingItems();
  }

  /**
   * Initialise l'inventaire avec les objets de départ
   * 2 Potions, 1 Éther, 1 Morceau d'étoile
   */
  private initializeStartingItems(): void {
    // Vérifier si l'inventaire est vide
    if (this.inventory.listItems().length === 0) {
      this.inventory.addItem(new Potion());
      this.inventory.addItem(new Potion());
      this.inventory.addItem(new Ether());
      this.inventory.addItem(new StarFragment());
      
      console.log('\n📦 Équipement initial du groupe :');
      console.log('   - 2x Potion 🧪');
      console.log('   - 1x Ether 💊');
      console.log('   - 1x Morceau d\'étoile ✨\n');
    }
  }

  public getMembers(): Adventurer[] {
    return this.members;
  }

  public getAliveMembers(): Adventurer[] {
    return this.members.filter((m) => m.isAlive());
  }

  public getInventory(): Inventory {
    return this.inventory;
  }

  public isWiped(): boolean {
    return this.getAliveMembers().length === 0;
  }
}
