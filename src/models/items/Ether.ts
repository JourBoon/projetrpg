import { Character } from '../Character.ts';
import { Item } from '../Item.ts';

export class Ether implements Item {
  public name = 'Ether';
  public description = 'Restaure 40% du mana max.';

  public use(target: Character): string {
    target.recoverManaPercent(40);
    return `${target.getName()} sent son énergie magique revenir.`;
  }
}
