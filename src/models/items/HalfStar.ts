import { Character } from '../Character.ts';
import { Item } from '../Item.ts';

export class HalfStar implements Item {
  public name = 'Demi-étoile';
  public description = 'Ressuscite à 50% HP si KO, sinon soigne 30% HP.';

  public use(target: Character): string {
    if (target.isDead()) {
      target.revive(50);
      target.recoverManaPercent(30);
      return `${target.getName()} revient d'entre les morts !`;
    }
    target.heal(30);
    return `${target.getName()} se sent mieux.`;
  }
}
