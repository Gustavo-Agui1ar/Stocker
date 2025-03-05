import Search from "./search.js"
import LoadImage from "./loadImage.js";
import Pagination from "./pagination/paginationManager.js";
import OrderItems from "../item/orderItems.js";

const complement = ['table', 'client', 'search'];
const MAX_SIZE = 10;

class ClientsSearch extends Search {
  
  constructor() {
    super(document.querySelector('#search'), document.querySelector('#clear'), document.querySelector('.table'));
    this.handleClickRow = this.handleClickRow.bind(this);
    this.initClickRows();
    this.initButtonBack();
    this.OrderItemsClient = null;
    this.handleSearchClients = this.handleSearchClients.bind(this);
    this.pagination = new Pagination(document.querySelector('.container-table'), (page) => this.handleSearchClients(page, MAX_SIZE));
    this.initClientSearch();
  }
  
  async initClickRows(){
    const table = this.table.getTable();
    table.querySelectorAll('tr').forEach((row, index)=> {
      row.addEventListener('click', this.handleClickRow.bind(this, row));
    });
  }

  
  getInformationRow(row) {
    const cells = row.querySelectorAll("td");
    const header = this.table.getTable().tHead.rows[0].cells;
  
    for (let i = 0; i < cells.length; i++) {
      if (header[i].id === "email") {
        return cells[i].textContent;
      }
    }
  
    return null;
  }
  
  async handleClickRow(row) {
    const content = this.getInformationRow(row);
    if (content === null) return;
  
    row.classList.add('loading');
    
    try {
      if (content !== "-") {
        const urlParam = new URLSearchParams({"email": content}).toString();
        const json = await this.fetchData(`/client/getByEmail?${urlParam}`);
  
        this.OrderItemsClient = new OrderItems("http://localhost:8080/client/getItems", document.querySelector(".container-order"), document.querySelector('.slider p'), content);
        this.OrderItemsClient.initOrderList();
  
        if (json) {
          this.insertDataCLient(json);
          await this.fetchClientImage(urlParam);
          this.toggleContainers();
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
    } finally {
      row.classList.remove('loading');
    }
  }
  

  insertDataCLient(json) {
  
    const client = document.querySelectorAll('.container-info');

    client.forEach(element => {
      const id = element.id;
      element.getElementsByClassName('info-client')[0].textContent = json[id];
    });
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, { method: 'GET' });
      if (!response.ok) throw new Error(`Erro ao buscar dados: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async fetchClientImage(urlParam) {
    const contentImg =  await this.fetchData(`/client/getImage?${urlParam}`);
    const loadImage = new LoadImage(contentImg, "../../Assets/Icons/Stocker.png",".logo_enterprise");
    loadImage.Init();
  }

  initStorename(name) {
    document.querySelector('#name-store').textContent = name;
  }

  toggleContainers() {
    complement.forEach(element => {
      document.querySelector(`.container-${element}`).classList.toggle('hidden');
    });
  }

  initButtonBack()  {
    document.querySelector(".back").addEventListener('click', () => {
      this.toggleContainers();
      this.OrderItemsClient.clearItems();
    });
  }
  
  async handleSearchClients(page, sizePage) {
    const data = this.handleSearch();
    const urlParam = new URLSearchParams(data).toString();
    const paginationDefault = new URLSearchParams({page: page, sizePage: sizePage}).toString();

    const responseClient = await fetch(`http://localhost:8080/client/search?${urlParam}&${paginationDefault}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(responseClient.status === 204) {
      alert('Nenhum cliente encontrado');
    } else if(responseClient.ok) {
      const json = await responseClient.json();
      this.insertPageData(json.list, json.sizeList);
      this.pagination.setMaxItens(json.size);
      this.pagination.recreatePagination(page);
      this.initClickRows();
    }
  }

  initClientSearch() {
    this.searchButton.addEventListener('click', async() => {
        await this.handleSearchClients(0, MAX_SIZE);
        this.pagination.recreatePagination(1);
    });
  }

}

const clientsSearch = new ClientsSearch();