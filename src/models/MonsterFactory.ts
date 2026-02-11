import { Monster } from './Monster.ts';
import { Boss } from './Boss.ts';

export class MonsterFactory {
  public static createRandom(): Monster {
    const roll = Math.random();
    if (roll < 0.25) return Monster.createGoblin();
    if (roll < 0.45) return Monster.createOrc();
    if (roll < 0.65) return Monster.createSkeleton();
    if (roll < 0.85) return Monster.createTroll();
    return Monster.createDragon();
  }

  public static createRandomBoss(): Boss {
    const roll = Math.random();
    if (roll < 0.34) return Boss.createDragonBoss();
    if (roll < 0.67) return Boss.createDemonLord();
    return Boss.createOrcWarlord();
  }
}
