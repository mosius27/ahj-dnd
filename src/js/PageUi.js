export default class PageUi {
  constructor(data) {
    this.data = data;
    this.container = null;
    this.cardsContainerEl = null;
    this.addCards = null;
    this.forms = null;
    this.cancelBtns = null;
    this.inputs = null;
    this.cards = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Контейнер не является элементом "HTMLElement"');
    }
    this.container = container;
  }

  drawUi() {
    this.cardsContainerEl = document.createElement('div');
    this.cardsContainerEl.classList.add('cards-container');
    this.container.append(this.cardsContainerEl);

    this.data.forEach((item) => {
      const cardsColEl = document.createElement('div');
      cardsColEl.id = `${item.id}`;
      cardsColEl.classList.add('cards-col');
      cardsColEl.innerHTML = `<p class="card-title">${item.title}</p>\n`
        + '                   <div class="cards"></div>\n'
        + '                   <div class="add-card">+ Add another card</div>\n'
        + '                   <form class="new-card-form">\n'
        + '                     <input type="text" class="card-input" placeholder="Enter a title for this card..." required>\n'
        + '                     <div class="button-container">\n'
        + '                       <button class="add-btn" type="submit">Add card</button>\n'
        + '                       <button class="cancel-btn">&#10005;</button>\n'
        + '                     </div>\n'
        + '                   </form>\n';
      this.cardsContainerEl.append(cardsColEl);
    });

    this.addCards = this.container.querySelectorAll('.add-card');
    this.forms = this.container.querySelectorAll('.new-card-form');
    this.cancelBtns = this.container.querySelectorAll('.cancel-btn');
    this.inputs = this.container.querySelectorAll('.card-input');
    this.cards = this.container.querySelectorAll('.cards');
  }

  static createCard(column, value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<div class="input-text">${value}</div>\n`
      + '              <button class="delete-btn hidden">&#10005;</button>';
    column.append(card);
  }

  static deleteCard(event) {
    event.parentElement.remove();
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Процесс не привязан к DOM');
    }
  }
}
