import { Character } from '../Character.ts';
import { Item } from '../Item.ts';

export class HalfStar implements Item {
  public name = 'Demi-étoile';
  public description = 'Ressuscite avec 100% HP si KO, sinon soigne 100% HP.';

  public use(target: Character): string {
    if (target.isDead()) {
      target.revive(100);
      target.recoverManaPercent(100);
      return `${target.getName()} revient d'entre les morts en pleine forme !`;
    }
    target.heal(100);
    target.recoverManaPercent(100);
    return `${target.getName()} est complètement restauré !`;
  }
}
