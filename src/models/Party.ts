import { Adventurer } from './Adventurer.ts';
import { Inventory } from './Inventory.ts';

export class Party {
  private members: Adventurer[];
  private inventory: Inventory;

  constructor(members: Adventurer[], inventory?: Inventory) {
    this.members = members;
    this.inventory = inventory ?? new Inventory();
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
