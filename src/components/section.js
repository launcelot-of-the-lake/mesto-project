class Section {
  constructor({ selector, items, renderer }) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() {
    this.items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}

export default Section;
