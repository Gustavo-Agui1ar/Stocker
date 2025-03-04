import Search from "./search.js"
import PaginationManager from "./pagination/paginationManager.js";

const MAX_SIZE = 10;

class SearchPagination extends Search {
  constructor() {
    super(document.querySelector('#search'), document.querySelector('#clear'), document.querySelector('.table'));
    this.container = document.querySelector('.container-table');
    this.pagination = new PaginationManager(this.container, (page) => this.handleSearchProduct(page, MAX_SIZE));
    this.initProductSearch();
  }

  async handleSearchProduct(page, sizePage) {

    const params = new URLSearchParams(this.handleSearch()).toString();
    const paginationDefault = new URLSearchParams({Page: Math.max(0,page), SizePage: sizePage}).toString();
    const response = await fetch(`http://localhost:8080/products/search?${params}&${paginationDefault}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if(response.status === 204) {
      alert('Nenhum produto encontrado');
    } else if(response.ok) {
      const json = await response.json();
      const data = json.products;

      data.forEach(element => {
        element.price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(element.price);
      });

      //exclui as colunas existentes
      this.insertPageData(data,json.sizeList);
      this.pagination.setMaxItens(json.size);
      this.pagination.recreatePagination(page);
    }
  }

  initProductSearch() {
    this.searchButton.addEventListener('click', async() => {
      await this.handleSearchProduct(0, MAX_SIZE);
      this.pagination.recreatePagination(1);
    });
  }
}

const searchPagination = new SearchPagination();