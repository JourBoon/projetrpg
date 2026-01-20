import { Item } from './Item.ts';

export class Inventory {
  private items: Item[] = [];

  public addItem(item: Item): void {
    this.items.push(item);
  }

  public removeItem(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  public listItems(): Item[] {
    return [...this.items];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }
}
