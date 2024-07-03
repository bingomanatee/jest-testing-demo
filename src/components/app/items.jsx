

export class ItemsManager {
   items = [];

   setItems(newItems) {
    this.items = [...newItems];
  }

   getItems() {
    return [...this.items];
  }
}

ItemsManager.Singleton = new ItemsManager();