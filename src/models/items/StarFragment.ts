import { Character } from '../Character.ts';
import { Item } from '../Item.ts';

export class StarFragment implements Item {
  public name = 'Fragment d\'étoile';
  public description = 'Restaure totalement HP et mana.';

  public use(target: Character): string {
    target.heal(100);
    target.recoverManaPercent(100);
    return `${target.getName()} est revigoré par la lumière stellaire !`;
  }
}
