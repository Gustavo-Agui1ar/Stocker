export default class Item {
  constructor(name, cod, category, quantity, orderDate, containerInsert) {
    this.name = name;
    this.vectorInfo = [cod, category, quantity, orderDate];
    this.complement = ["Cod: " ,"Cat: ", "Qtd: ", "Date: "];
    this.containerInsert = containerInsert;
    this.cod = cod;
    this.removeItem = this.removeItem.bind(this);
    this.item = null;
  }

  CreateItem() {
    const containerItem = this.createContainerItem();
    const PrimaryTextItem = this.createPrimaryTextItem();
    const InfoOrder = this.createInfoOrder();
    const checkBtn = this.createCheckBtn();

    containerItem.append(PrimaryTextItem, InfoOrder, checkBtn);

    this.item = containerItem;
    this.appendItemIn();
    return containerItem;
  }

  createContainerItem() {
    const containerItem = document.createElement('div');
    containerItem.classList.add('flexCenter', 'orderitem');

    containerItem.style.backgroundColor = this.getBackgroundColor();
    
    return containerItem;
  }


  removeItem() {
    this.item.remove();
    //logica de remoção db
    //.. a fazer
  }

  createPrimaryTextItem() {
    const div = Object.assign(document.createElement('div'), {
      className: 'flexCenter primary-text-item'
    });
    
    const i = Object.assign(document.createElement('i'), {
      className: 'fa-solid fa-box'
    });

    const p = Object.assign(document.createElement('p'), {
      className: 'primary-p',
      textContent: this.getFormattedName()
    });

    div.append(i, p);
    return div;
  }

  getFormattedName() {
    const diffInDays = this.calcPassTime();

    if (diffInDays < 20) return `${this.name} (No prazo)`;
    if (diffInDays < 35) return `${this.name} (Atrasado)`;
    return `${this.name} (Muito atrasado)`;
  }

  getBackgroundColor() {
    const diffInDays = this.calcPassTime();

    if (diffInDays < 20) return 'var(--green-400)';
    if (diffInDays < 35) return 'var(--yellow-400)';
    return 'var(--red-400)';
  }


  calcPassTime() {
    const dateParts = this.vectorInfo[3].split('-');
    const date1 = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const diff1 = Math.abs(Date.now() - date1.getTime());

    return  Math.ceil(diff1 / (1000 * 60 * 60 * 24));
  }

  createInfoOrder() {
    const div = Object.assign(document.createElement('div'), {
      className: 'flexCenter flex-column infoOrder'
    });

    this.vectorInfo.map((info, index) => {
      const p = Object.assign(document.createElement('p'), {
        className: 'second-p',
        textContent: `${this.complement[index]} ${info}`
      });
      div.append(p);
    });

    return div;
  }

  createCheckBtn() {
    const btn = Object.assign(document.createElement('button'), {
      className: 'btn-none'
    });

    const i = Object.assign(document.createElement('i'), {
      className: 'fa-solid fa-check check'
    });

    btn.append(i);
    btn.addEventListener('click', this.removeItem);

    return btn;
  }

  appendItemIn() {
    this.containerInsert.append(this.item);
  }
}
