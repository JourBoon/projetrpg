import { Room } from './Room.ts';
import { Party } from '../models/Party.ts';
import { MonsterFactory } from '../models/MonsterFactory.ts';
import { Fight } from '../game/Fight.ts';

export class BossRoom extends Room {
  public async enter(party: Party): Promise<boolean> {
    console.log('\n🔥 Vous atteignez la salle du boss. Une présence écrasante se fait sentir...');
    const boss = MonsterFactory.createRandomBoss();

    const fight = new Fight(party, [boss]);
    await fight.start();

    if (party.isWiped()) {
      console.log('💀 Le boss a anéanti votre groupe...');
      return false;
    }

    console.log('🏆 Vous avez vaincu le boss !');
    return true;
  }
}
