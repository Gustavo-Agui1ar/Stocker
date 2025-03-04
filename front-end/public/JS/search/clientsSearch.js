import Search from "./search.js"
import LoadImage from "./loadImage.js";
import Pagination from "./pagination/paginationManager.js";

const complement = ['table', 'client', 'search'];
const MAX_SIZE = 10;

class ClientsSearch extends Search {
  
  constructor() {
    super(document.querySelector('#search'), document.querySelector('#clear'), document.querySelector('.table'));
    this.handleClickRow = this.handleClickRow.bind(this);
    this.initClickRows();
    this.initButtonBack();
    this.handleSearchClients = this.handleSearchClients.bind(this);
    this.pagination = new Pagination(document.querySelector('.container-table'), (page) => this.handleSearchClients(page, MAX_SIZE));
    this.initClientSearch();
  }
  
  initClickRows(){
    const table = this.table.getTable();
    table.querySelectorAll('tr').forEach((row, index)=> {
      row.addEventListener('click', this.handleClickRow.bind(this, row));
    });
  }

  async handleClickRow(row) {
    const cells = row.querySelectorAll('td');
    const content = new Map();
    const header = this.table.getTable().tHead.rows[0].cells;
    cells.forEach((cell, index) => {
      content.set(header[index].id, cell.textContent);
    });

    if(content.get("email") != "-") {
      const urlParam = new URLSearchParams({"email": content.get("email")}).toString();
      
      const responseClient = await fetch(`http://localhost:8080/client/getByEmail?${urlParam}`, {
        method: 'GET'
      });
      
      if(responseClient.ok) {
        const json = await responseClient.json();
        this.initStorename(json.store);
        const container = document.querySelectorAll('.container-info');
        container.forEach((element) => {
          const text = element.querySelector('.info-client');
          text.textContent = json[element.id];
        });
        
        const responseImage = await fetch(`http://localhost:8080/client/getImage?${urlParam}`, {
          method: 'GET'
        });

        const contentImg = await responseImage.json();
        console.log(contentImg);
        const loadImage = new LoadImage(contentImg, "../../Assets/Icons/Stocker.png",".logo_enterprise");
        loadImage.Init();

        for(const element of complement) {
          const container = document.querySelector(`.container-${element}`);
          container.classList.toggle('hidden');
        }
      }
    }
  }

  initStorename(name) {
    document.querySelector('#name-store').textContent = name;
  }

  initButtonBack()  {
    document.querySelector(".back").addEventListener('click', () => {
      for(const element of complement) {
        const container = document.querySelector(`.container-${element}`);
        container.classList.toggle('hidden');
      }
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