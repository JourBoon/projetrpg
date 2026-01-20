import { Party } from '../models/Party.ts';

export abstract class Room {
  public abstract enter(party: Party): Promise<boolean>;
}
