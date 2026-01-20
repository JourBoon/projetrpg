import { Room } from './Room.ts';
import { Party } from '../models/Party.ts';
import { MonsterFactory } from '../models/MonsterFactory.ts';
import { Monster } from '../models/Monster.ts';
import { Fight } from '../game/Fight.ts';

export class CombatRoom extends Room {
  public async enter(party: Party): Promise<boolean> {
    const monsters: Monster[] = [];
    const monsterCount = 2 + Math.floor(Math.random() * 2); // 2-3 monstres

    for (let i = 0; i < monsterCount; i++) {
      monsters.push(MonsterFactory.createRandom());
    }

    console.log(`\n🚪 Une salle de combat vous attend ! ${monsterCount} monstres surgissent.`);

    const fight = new Fight(party, monsters);
    await fight.start();

    if (party.isWiped()) {
      console.log('💀 Votre groupe est tombé...');
      return false;
    }

    console.log('✅ La salle est sécurisée.');
    return true;
  }
}
