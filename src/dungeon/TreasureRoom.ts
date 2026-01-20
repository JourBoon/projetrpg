import { Room } from './Room.ts';
import { Party } from '../models/Party.ts';
import { Menu } from '../utils/Menu.ts';
import { Item } from '../models/Item.ts';
import { Potion } from '../models/items/Potion.ts';
import { Ether } from '../models/items/Ether.ts';
import { StarFragment } from '../models/items/StarFragment.ts';
import { HalfStar } from '../models/items/HalfStar.ts';

export class TreasureRoom extends Room {
  private menu = new Menu();

  public async enter(party: Party): Promise<boolean> {
    console.log('\n💰 Une salle au trésor scintille devant vous.');
    const open = await this.menu.askYesNo('Voulez-vous ouvrir le coffre ?');

    if (!open) {
      console.log('Vous passez votre chemin.');
      return true;
    }

    if (Math.random() < 0.35) {
      console.log('⚠️ Le coffre était piégé ! Du gaz toxique se répand.');
      party.getAliveMembers().forEach((ally) => ally.takeTrueDamage(10));
      if (party.isWiped()) return false;
      console.log('Vous survivez au piège.');
      return true;
    }

    const inventory = party.getInventory();
    const foundItems = [this.randomItem(), this.randomItem()];
    foundItems.forEach((item) => inventory.addItem(item));

    console.log('🎁 Vous obtenez :');
    foundItems.forEach((item) => console.log(`   - ${item.name}`));

    return true;
  }

  private randomItem(): Item {
    const roll = Math.random();
    if (roll < 0.3) return new Potion();
    if (roll < 0.55) return new Ether();
    if (roll < 0.8) return new HalfStar();
    return new StarFragment();
  }
}
