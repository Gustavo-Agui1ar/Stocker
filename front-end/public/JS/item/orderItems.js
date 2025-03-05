import Item from "./item.js"

export default class OrderItems {
  constructor(url, appendIn,info, emailClient) {
    this.url = url;
    this.appendIn = appendIn;
    this.info = info;
    this.emailClient = emailClient; 
  }

  async fetchItems(complement) {
    try {
      const response = await fetch(`${this.url}?${complement}`, {
        method: 'GET'
      });
  
      if (response.status === 404) {
        console.log('Items não encontrados');
        return null;
      }
      
      if (response.ok) {
        return await response.json();
      }
      
      return null;
      
    } catch (error) {
      console.error(`Erro ao buscar itens: ${response.status} - ${response.statusText}`);
      return null;
    }
  }

  createItems(arrayItems) {
    arrayItems.forEach(element => {
        const item = new Item(element.name, element.cod, element.cat, element.qty, element.date, this.appendIn);
        item.CreateItem();
    });
  }

  async initOrderList() {
    const json = await this.fetchItems(new URLSearchParams({email: this.emailClient}).toString());
    if(json !== null) {
      this.info.textContent = "Pedidos";
      this.createItems(json);
    } else {
      this.info.textContent = "";
    } 
  }

  clearItems() {
    this.appendIn.innerHTML = "";
  }
}