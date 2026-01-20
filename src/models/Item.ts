import { Character } from './Character.ts';

export interface Item {
  name: string;
  description: string;
  use: (target: Character) => string;
}
