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

  public displayItems(): void {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      console.log(`${i + 1}. ${item.name} - ${item.description}`);
    }
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }
}
