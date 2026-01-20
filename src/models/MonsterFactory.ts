import { Monster } from './Monster.ts';
import { Boss } from './Boss.ts';

export class MonsterFactory {
  public static createRandom(): Monster {
    const roll = Math.random();
    if (roll < 0.5) return Monster.createGoblin();
    if (roll < 0.85) return Monster.createOrc();
    return Monster.createDragon();
  }

  public static createRandomBoss(): Boss {
    const roll = Math.random();
    if (roll < 0.34) return Boss.createDragonBoss();
    if (roll < 0.67) return Boss.createDemonLord();
    return Boss.createOrcWarlord();
  }
}
