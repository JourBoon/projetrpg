import { Character } from '../Character.ts';
import { Item } from '../Item.ts';

export class StarFragment implements Item {
  public name = 'Morceau d\'étoile';
  public description = 'Ressuscite avec 20% HP si KO, sinon soigne 50% HP.';

  public use(target: Character): string {
    if (target.isDead()) {
      target.revive(20);
      return `${target.getName()} revient à la vie !`;
    }
    target.heal(50);
    return `${target.getName()} se sent revigoré !`;
  }
}
