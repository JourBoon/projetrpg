import { Character } from '../Character.ts';
import { Item } from '../Item.ts';

export class Potion implements Item {
  public name = 'Potion';
  public description = 'Restaure 50% des HP max.';

  public use(target: Character): string {
    target.heal(50);
    return `${target.getName()} retrouve des forces !`;
  }
}
